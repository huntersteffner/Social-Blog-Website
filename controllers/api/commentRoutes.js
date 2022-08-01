const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')
const {post} = require('./userRoutes')

router.get('/', async (req, res) => {
    await Comment.findAll({})
    .then((commentData) => res.json(commentData))
    .catch(err => res.status(500).json(err))
})

router.post('/', withAuth, async(req, res) => {
    if(req.session) {
       await Comment.create({
        content: req.body.content,
        postId: req.body.postId,
        userId: req.body.userId
       })
       .then((commentData) => res.json(commentData))
       .catch(err => res.status(500).json(err))
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    await Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then((commentData) => {
        if(!commentData) {
            res.status(404).json({message: 'No comment with this id found'})
            return
        } else {
            res.json(commentData)
        }
        
    })
    .catch(err => res.status(500).json(err))
    
})

module.exports = router