import prisma from '../lib/prisma.js';
import {
  BadRequestException,
  ForbiddenException,
} from '../errors/customException.js';

export const getWorksWithLikes = async ({
  challengeId,
  userId,
  page,
  limit,
}) => {
  const offset = (page - 1) * limit;

  let sortOrder = [
    { likeCount: 'desc' },
    { lastModifiedAt: 'desc' },
    { id: 'desc' },
  ];

  const works = await prisma.work.findMany({
    where: {
      challengeId: Number(challengeId),
    },
    orderBy: sortOrder,
    skip: offset,
    take: Number(limit),
    select: {
      id: true,
      userId: true,
      challengeId: true,
      content: true,
      lastModifiedAt: true,
      isSubmitted: false,
      submittedAt: false,
      likeCount: true,
    },
  });

  const userLikes = await prisma.like.findMany({
    where: {
      userId: userId,
      workId: {
        in: works.map((work) => work.id),
      },
    },
  });

  const worksList = works.map((work) => {
    const isLiked = userLikes.some((like) => like.workId === work.id);
    return {
      ...work,
      isLiked,
    };
  });

  //마감하면 베스트 게시물 조회
  const bestWorks = await bestWorksList({ challengeId, userId });

  const total = await prisma.work.count({
    where: {
      challengeId: Number(challengeId),
    },
  });

  return {
    totalPages: Math.ceil(total / limit),
    total,
    bestList: bestWorks,
    list: worksList,
  };
};

export const getWorkDetail = async ({ userId, workId }) => {
  const works = await prisma.work.findUnique({
    where: {
      id: Number(workId),
    },
    include: {
      challenge: {
        select: {
          title: true,
          field: true,
          docType: true,
        },
      },
      user: {
        select: {
          nickname: true,
        },
      },
    },
  });

  const likedId = await prisma.like.findFirst({
    where: {
      workId: Number(workId),
      userId: Number(userId),
    },
  });

  const isLike = likedId ? true : false;

  return {
    userId: works.id,
    nickname: works.user.nickname,
    content: works.content,
    lastModifiedAt: works.lastModifiedAt,
    likeCount: works.likeCount,
    isLike,
    challenge: {
      id: works.challengeId,
      title: works.challenge.title,
      field: works.challenge.field,
      docType: works.challenge.docType,
    },
  };
};

export const createWork = async ({ challengeId, content, userId }) => {
  if (!content) {
    throw new BadRequestException('내용 입력은 필수입니다.');
  }

  const works = await prisma.work.create({
    data: {
      content: content,
      userId: Number(userId),
      challengeId: Number(challengeId),
      isSubmitted: true,
    },
    select: {
      id: true,
      userId: true,
      challengeId: true,
      content: true,
      lastModifiedAt: true,
    },
  });
  return works;
};

export const updatedWork = async ({ workId, content }) => {
  if (!content) {
    throw new BadRequestException('내용 입력은 필수입니다.');
  }

  const works = await prisma.work.update({
    where: { id: Number(workId) },
    data: {
      content: content,
    },
    select: {
      id: true,
      userId: true,
      challengeId: true,
      content: true,
      lastModifiedAt: true,
    },
  });
  return works;
};

export const deleteWork = async ({ workId, userId }) => {
  const participations = await prisma.participations.findFirst({
    where: {
      userId: Number(userId),
    },
  });

  await prisma.$transaction(async (prisma) => {
    await prisma.work.delete({
      where: {
        id: Number(workId),
      },
    });

    await prisma.participations.delete({
      where: {
        id: Number(participations.id),
      },
    });

    await prisma.challenge.update({
      where: {
        id: Number(participations.challengeId),
      },
      data: { participants: { decrement: 1 } },
    });
  });
};

export const likeWork = async ({ workId, userId }) => {
  const challengeDeadlineBoolean = await challengeDeadline(workId);

  if (!!!challengeDeadlineBoolean.progress) {
    await prisma.$transaction([
      prisma.like.create({
        data: {
          workId: Number(workId),
          userId: Number(userId),
        },
      }),
      prisma.work.update({
        where: { id: Number(workId) },
        data: { likeCount: { increment: 1 } },
      }),
    ]);
  } else {
    throw new BadRequestException('챌린지가 마감됐습니다.');
  }
};

export const likeCancelWork = async ({ workId, userId }) => {
  const challengeDeadlineBoolean = await challengeDeadline(workId);

  if (!!!challengeDeadlineBoolean.progress) {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: Number(userId),
        workId: Number(workId),
      },
    });

    if (existingLike) {
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        }),
        prisma.work.update({
          where: { id: Number(workId) },
          data: { likeCount: { decrement: 1 } },
        }),
      ]);
    } else {
      throw new ForbiddenException('좋아요가 존재하지 않습니다.');
    }
  } else {
    throw new BadRequestException('챌린지가 마감됐습니다.');
  }
};

//커서 기반
export const getFeedbacks = async ({ workId, cursorId, limit }) => {
  const feedbacks = await prisma.feedback.findMany({
    where: { workId: Number(workId) },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    ...(cursorId && { cursor: { id: Number(cursorId) } }),
    take: Number(limit + 1),
    include: {
      user: {
        select: {
          nickname: true,
          grade: true,
        },
      },
    },
  });

  const nextCursor = feedbacks.slice(limit)[0]?.id || null;

  const hasNext = feedbacks.length > limit ? true : false;
  const list = feedbacks.slice(0, limit);

  return { hasNext, nextCursor, list };
};

const challengeDeadline = async (workId) => {
  const workInfo = await prisma.work.findFirst({
    where: {
      id: Number(workId),
    },
  });

  const challengeInfo = await prisma.challenge.findFirst({
    where: {
      id: Number(workInfo.challengeId),
    },
  });

  return challengeInfo;
};

const bestWorksList = async ({ challengeId, userId }) => {
  const challengeInfo = await prisma.challenge.findUnique({
    where: {
      id: Number(challengeId),
    },
  });

  if (!!challengeInfo.progress) {
    let sortOrder = [
      { likeCount: 'desc' },
      { lastModifiedAt: 'desc' },
      { id: 'desc' },
    ];

    const workList = await prisma.work.findMany({
      where: {
        challengeId: Number(challengeId),
      },
      orderBy: sortOrder,
    });

    const workLikeCount = workList.map((work) => {
      return work.likeCount;
    });

    const NumberLikeCount = Math.max(...workLikeCount);

    const bestWorks = await prisma.work.findMany({
      where: {
        challengeId: Number(challengeId),
        likeCount: Number(NumberLikeCount),
      },
      orderBy: sortOrder,

      select: {
        id: true,
        userId: true,
        challengeId: true,
        content: true,
        lastModifiedAt: true,
        isSubmitted: false,
        submittedAt: false,
        likeCount: true,
      },
    });

    const userLikes = await prisma.like.findMany({
      where: {
        userId: userId,
        workId: {
          in: bestWorks.map((work) => work.id),
        },
      },
    });

    const bestWorkList = bestWorks.map((work) => {
      const isLiked = userLikes.some((like) => like.workId === work.id);
      return {
        ...work,
        isLiked,
      };
    });

    return bestWorkList;
  } else {
    return;
  }
};
