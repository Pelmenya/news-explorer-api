const router = require('express').Router();

const {
  getUser,
  getUsers,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

module.exports = router;
