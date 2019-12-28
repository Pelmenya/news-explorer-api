const router = require('express').Router();
const { validateSignIn, validateSignUp } = require('../validate');
const { login, createUser } = require('../controllers/userAuth');

router.post('/signin', validateSignIn, login);

router.post('/signup', validateSignUp, createUser);

module.exports = router;
