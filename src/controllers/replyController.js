// replyController.js

import * as replyService from '../services/replyService.js';

// 대댓글 작성
export const postReplyById = async (req, res, next) => {
  try {
    const { feedbackId } = req.params;
    const { userId } = req.user;
    const { content } = req.body;

    await replyService.validateCreateReplyAccess({ userId, feedbackId });

    const newReply = await replyService.postReplyByFeedbackId({
      feedbackId,
      userId,
      content,
    });

    res.status(201).json(newReply);
  } catch (error) {
    next(error);
  }
};

// 대댓글 수정
export const updateReplyById = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.user;
    const { content } = req.body;

    const updatedReply = await replyService.updateReplyById({
      replyId,
      userId,
      content,
    });

    res.status(200).json({ data: updatedReply });
  } catch (error) {
    next(error);
  }
};

// 대댓글 삭제
export const deleteReplyById = async (req, res, next) => {
  try {
    const { replyId } = req.params;
    const { userId } = req.user;

    await replyService.deleteReplyById({ replyId, userId });

    res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
  } catch (error) {
    next(error);
  }
};

export const getReplies = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { feedbackId } = req.params;
    const { cursorId = null, limit = 3 } = req.query;

    const repliesData = await replyService.getReplies({
      feedbackId,
      cursorId,
      limit,
      userId,
    });

    return res.status(200).json(repliesData);
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
};
