const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try{
        let token = await authService.login({ username, password}) ;
        //TODO: SET token to http only cookie 

    } catch (err) {

    }
    
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { name, username, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.error = 'Password mismatch';

        return res.render('auth/register')
    }

    try {
        await authService.register({
            name,
            username,
            password
        });

        res.redirect('/')    
    } catch(err) {
        //TODo: return eroor responce
    }
});

module.exports = router;