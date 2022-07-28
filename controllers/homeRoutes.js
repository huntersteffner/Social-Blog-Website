const router = require('express').Router()
const {Post,User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const postSerialized = allPosts.map((post) => post.get({
            plain: true
        }))

        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/post/:id', async (req, res) => {
    try {
        const postFromId = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        const post = postFromId.get({plain: true})

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/profile', withAuth, async(req, res) => {
    try {
        const euData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Post}]
        })

        const user = euData.get({plain: true})

        res.render('profile', {
            ...user,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile')
        return
    }

    res.render('login')
})

module.exports = router