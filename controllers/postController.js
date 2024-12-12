// Post Controller
const db = require('../config/global').db;

// POST /post
// 게시글을 작성하고 DB에 추가.
// 게시글 아래에는 댓글을 담는 필드가 있어야 한다.
// 실패하면 실패 이유 전송
// 내용 =====================================
// postId : 게시글의 id
// postTitle : 게시글의 제목
// postAuthor : 게시글 작성자
// postBody : 게시글 본문
// postComments : 게시글 댓글
const createPost = async (req, res) => {
    try {
        const postDocument = req.body;
        const postCollection = db.collection('post');
        const result = postCollection.insertOne(postDocument);
        
        if (result) {
            res.send('Create Post');
        } else {
            res.send('Fail to Create Post');
        }
    } catch (err) {
        console.log(new Error(err));
    }
}

// GET /post/:post-id
const getPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const postCollection = db.collection('post');
        const result = await postCollection.findOne({postId : postId});

        if (result) {
            res.json(result);
        } else {
            res.send('Fail to Load Post Page');
        }
    } catch (err) {
        console.log(new Error(err));
    }
}

// POST /post/:post-id
const createComment = async (req, res) => {
    try {
        const postId = req.params.postId;
        const postComment = req.body.postComment;
        const postCollection = db.collection('post');
        let result = await postCollection.findOne({postId : postId});

        if (result) {
            result = await postCollection.updateOne({postId: postId}, {$push: {postComments: postComment}});
            if (result.modifiedCount) {
                res.send('Success to Create Post Comment');
            } else {
                res.send('Fail to Create Post Comment');
            }
        } else {
            res.send('Fail to Create Post Comment');
        }
    } catch (err) {
        console.log(new Error(err));
    }
}

module.exports = {createPost, getPost, createComment};