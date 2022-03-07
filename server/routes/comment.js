const commentRoute = require('express').Router()
const CommentController = require('../controllers/CommentController')
const { authentication, authorization } = require("../middlewares/auth");


commentRoute.get('/', CommentController.allComment)
commentRoute.get('/:id', CommentController.getCommentById)
commentRoute.post('/add/:id',authentication, CommentController.add)
commentRoute.put('/edit/:id',authentication, authorization, CommentController.update)
commentRoute.delete('/delete:id', authentication, authorization, CommentController.remove)




module.exports = commentRoute