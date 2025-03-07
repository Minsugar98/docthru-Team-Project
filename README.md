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

## <span id="dev">기술스택</span>
### **기술 스택**
- **Express, Prisma, NodeJS**
- **AWS EC2, S3, PostgreSQL, Github**



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

