// const router = require('../config/global').router;
const router = require('express').Router();
const {createPost, getPost, createComment} = require('../controllers/postController');

router.route('/')
 .post(createPost);

router.route('/:postId')
 .get(getPost)
 .post(createComment);

module.exports = router;