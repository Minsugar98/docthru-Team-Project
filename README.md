<div align=center>
	<span id="top">
	<h1>Docthru BE</h1><br>
		
<b>[Docthru-API 바로가기](https://docthru-be.vercel.app/api-docs/)</b> <br>
<b>[Docthru 바로가기](https://docthru.vercel.app/)</b> <br>
<b>[시연 영상](https://drive.google.com/file/d/1yDwxmnJVvFW97Uld3iAmxzuNDuB9XU8b/view?usp=sharing)<b><br>

<br> 
</div>

## <span id="roles"> 개발 기능 </span>
- [챌린지 Swagger](https://docthru-be.vercel.app/api-docs/#/Challenge)
  - 챌린지 목록 조회
  - 챌린지 어플리케이션 목록 조회
  - 챌린지 어플레키이션 생성
  - 특정 챌린지 조회
  - 챌린지 수정
  - 챌린지 URL 조회
  - 챌린지 참여
  - 챌린지 포기
  - 챌린지 신청 취소

## <span id="dev">기술 및 개발 환경</span>

### Backend
<img src="https://img.shields.io/badge/express-black?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Postgre-black?style=for-the-badge&logo=postgreSQL&logoColor=white">

### Database
<img src="https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=Prisma&logoColor=white">

### 협업방식

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" width="100" height="28">


### 배포

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

<br>




<br>

<details>
<summary>폴더 구조 보기</summary>

<pre>
	📦src
 ┣ 📂configs
 ┃ ┣ 📜config.js
 ┃ ┣ 📜database.js
 ┃ ┗ 📜swagger.js
 ┣ 📂controllers
 ┃ ┣ 📜applicationController.js
 ┃ ┣ 📜challengeController.js
 ┃ ┣ 📜feedbackController.js
 ┃ ┣ 📜notificationController.js
 ┃ ┣ 📜profileController.js
 ┃ ┣ 📜replyController.js
 ┃ ┣ 📜userController.js
 ┃ ┗ 📜workController.js
 ┣ 📂errors
 ┃ ┣ 📜commonException.js
 ┃ ┗ 📜customException.js
 ┣ 📂lib
 ┃ ┗ 📜prisma.js
 ┣ 📂middlewares
 ┃ ┣ 📜authMiddleware.js
 ┃ ┣ 📜errorHandler.js
 ┃ ┣ 📜jsonParser.js
 ┃ ┗ 📜rateLimiter.js
 ┣ 📂routes
 ┃ ┣ 📜applicationRoutes.js
 ┃ ┣ 📜challengeRoutes.js
 ┃ ┣ 📜feedbackRoutes.js
 ┃ ┣ 📜notificationRoutes.js
 ┃ ┣ 📜profileRoutes.js
 ┃ ┣ 📜replyRoutes.js
 ┃ ┣ 📜userRoutes.js
 ┃ ┗ 📜workRoutes.js
 ┣ 📂services
 ┃ ┣ 📜applicationService.js
 ┃ ┣ 📜challengeServices.js
 ┃ ┣ 📜feedbackService.js
 ┃ ┣ 📜notificationService.js
 ┃ ┣ 📜profileService.js
 ┃ ┣ 📜replyService.js
 ┃ ┣ 📜userServices.js
 ┃ ┗ 📜workServices.js
 ┣ 📂utils
 ┃ ┣ 📜authValidation.js
 ┃ ┗ 📜generate.js
 ┣ 📂validationSchemas
 ┃ ┗ 📜profileSchema.js
 ┗ 📜app.js
	
</pre>
</details>

