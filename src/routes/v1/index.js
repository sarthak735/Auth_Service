const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index')

const router = express.Router();

router.post(
    '/signup',
    AuthRequestValidators.validateAuth,
    UserController.create);
router.post(
    '/signin',
    AuthRequestValidators.validateAuth,
    UserController.signin);

module.exports = router;