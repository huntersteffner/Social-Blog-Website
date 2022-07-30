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
            postSerialized,
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

router.get('/dashboard', async (req, res) => {
    
    try {
        if(req.session.logged_in) {
            const allUserPosts = await Post.findAll({
                where: {
                    userId: req.session.userId
                },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            })

            console.log(req.session)
    
            const allUserPostsSerialized = allUserPosts.map((post) => post.get({
                plain: true
            }))
    
            res.render('dashboard', {
                allUserPostsSerialized,
                logged_in: req.session.logged_in
            })
        } else {
            res.redirect('login')
        }

    } catch (err) {
        res.status(500).json(err)
    }

    
})

module.exports = router