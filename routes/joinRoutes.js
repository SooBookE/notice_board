// const router = require('../config/global').router;
const router = require('express').Router();
const createAccount = require('../controllers/joinController');

router.route('/')
 // 회원가입 페이지로 이동
 .get((req, res) => {
    res.send("This is a Join Page");
 })
 .post(createAccount);

 module.exports = router;