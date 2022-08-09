const router = require('express').Router()
const {User} = require('../../models')

// Create user
router.post('/', async (req, res) => {
    try {
        const euData = await User.create(req.body)

        // https://stackoverflow.com/questions/30002321/what-is-the-difference-between-save-and-create-in-sequelizejs
        
        req.session.save(() => {
            req.session.userId = euData.id;
            req.session.username = euData.username;
            req.session.logged_in = true;

            res.status(200).json(euData)
        })

    } catch (err) {
        res.status(400).json(err)
    }
})
// Login a user
router.post('/login', async (req, res) => {
    try {
        const euData = await User.findOne({where: {username: req.body.username}})

        if (!euData) {
            res.status(400).json({message: 'Incorrect username or password, please try again.'})
            return
        }
        const enteredPassword = await euData.validatePassword(req.body.password)

        if(!enteredPassword) {
            res.status(400).json({message: 'Incorrect username or password, please try again.'})
            return
        }

        req.session.save(() => {
            req.session.userId = euData.id
            req.session.username = euData.username
            req.session.logged_in = true

            res.json({user: euData, message: 'You are now logged in'})
        })
    } catch (err) {
        res.status(400).json(err)
    }
})
// Logout a user
router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router