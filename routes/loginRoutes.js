// const router = require('../config/global').router;
const router = require('express').Router();
const getAccount = require('../controllers/loginController');

router.route('/')
 .get(getAccount);

 module.exports = router;