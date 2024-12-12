/*
- 기능 요구사항
    - 회원가입/로그인
    - 게시물 작성
    - 게시물 목록보기
    - 게시물 읽기
    - 댓글 작성

- 백엔드: 게시판 Server API 구현
*/

/* 전역 기능 선언 */
require('dotenv').config(); // dotenv 실행
const PORT = process.env.PORT; // Port 번호
const express = require('express');
const app = express(); // app이라는 이름의 서버 생성
const { jwt, jwt_secret_key, db } = require('./config/global');

// Body-parser 미들웨어 사용(요청의 본문 파싱)
app.use(express.json()); // json 요청 파싱
app.use(express.urlencoded({extended : true})); // 쿼리 스트링 파싱

// 메인 페이지
// 토큰이 있으면 "Log-In" 출력
// 토큰이 없으면 "Log-Out" 출력
app.get("/", (req, res) => {
    try {
        const receivedToken = req.headers['authorization'];
        const decoded = jwt.verify(receivedToken, jwt_secret_key);
        res.send('Log-In');
    } catch (err) {
        res.send('Log-Out');
    }
});

/* 회원가입 기능 */
// 회원가입 페이지 이동
app.use('/join', require('./routes/joinRoutes'));

/* 로그인 기능 */
app.use('/login', require('./routes/loginRoutes'));

/* 게시물 */
// 게시물 리스트 출력
// DB에서 모든 게시물의 id와 제목, 작성자를 가져와 반환한다.
app.get('/post-list', async (req, res) => {
    try {
        const postCollection = db.collection('post');
        const postList = await postCollection.find().toArray();
        if (postList) {
            let outputPostList = [];
            for (element of postList) {
                let item = {
                    postId : element.postId,
                    postTitle : element.postTitle,
                    postAuthor : element.postAuthor
                };
                outputPostList.push(item);
            }
            res.json(outputPostList);
        } else {
            res.send('Fail to print Post List');
        }
    } catch (err) {
        res.send(new Error(err));
    }
})
// 게시물 생성 및 읽기
app.use('/post', require('./routes/postRoutes'));

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server starts in ${PORT} Port.`);
});