const router = require('express').Router()
const { Post} = require('../../models')
const { update } = require('../../models/User')
const withAuth = require('../../utils/auth')
// const { post } = require('./userRoutes')

router.post('/', withAuth, async(req,res) => {
    console.log(req.body)
    try {

        const newPost = await Post.create({
            ...req.body,
            userId: req.session.userId,
        })

        res.status(200).json(newPost)
        // res.status(200).json({message: "it worked"})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id,
                // userId: req.session.user_id,
            }
        })

        if(!postDelete) {
            res.status(404).json({message: 'No posts with this ID'})
            return
        }

        res.status(200).json(postDelete)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', withAuth, async (req, res) => {
    // Post.update(req.body, {
    //     where: {
    //         id: req.params.id
    //     }
    // })
    // .then((post) => {
    //     console.log(post)
    // }) 

    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then((post) => {
        res.json(post)
    })
    .catch((err) => {
        console.log(err)
        res.json(err)
    })

    
    
})

module.exports = router