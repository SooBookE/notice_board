// Join Controller
const { db, crypto } = require('../config/global');

// POST /join
// 회원가입 페이지에서 전달 받은 유저 데이터를 DB에 저장
// 저장 성공하면 성공 메세지 송신
// 실패하면 실패한 이유 송신
// 유저 데이터 =======================================
// id : 회원 id
// pw : 회원 pw
// name : 회원 이름
// phone : 회원 전화번호
const createAccount = async (req, res) => {
    let pw = crypto
     .createHash("sha512")
     .update(req.body.pw)
     .digest('base64');
    const newDocument = {
        id : req.body.id,
        pw : pw,
        name : req.body.name,
        phone : req.body.phone
    };
    try {
        const userCollection = db.collection('user');
        let result = await userCollection.findOne({id : newDocument.id});
        if (result) {
            res.send('Already Exists');
            return;
        }
        result = await userCollection.insertOne(newDocument);
        if (result) {
            res.send('Success to Create Account!');
        } else {
            res.send('Fail to Create Account');
        }
    } catch (err) {
        console.log(new Error(err));
    }
}

module.exports = createAccount;