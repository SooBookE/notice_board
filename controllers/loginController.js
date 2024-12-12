// Login Controller
const { db, crypto, jwt, jwt_secret_key } = require('../config/global');

// GET /login
// 로그인 요청을 하면 DB에 해당 유저 정보가 있는지 확인
// 유저 정보가 있다면 성공 확인하고 토큰 전달
// 없다면 실패 이유 반환
const getAccount = async (req, res) => {
    try {
        const userId = req.query.id;
        const userPw = crypto
         .createHash('sha512')
         .update(req.query.pw)
         .digest('base64');
        const userCollection = db.collection('user');
        const result = await userCollection.findOne({id: userId, pw: userPw});
        
        if (result) {
            const payload = {id : result.id};
            const token = jwt.sign(payload, jwt_secret_key);
            res.json({token : token});
        } else {
            res.send('Fail to Log-in');
        }
    } catch (err) {
        console.log(new Error(err));
    }
}

module.exports = getAccount;