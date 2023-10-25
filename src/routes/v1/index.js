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

router.get('/isAuthenticated', UserController.isAuthenticated);

// router.get('/dummy', (req, res) => {
//     return res.status(200).json({message: 'OK'});
// })

router.get(
    '/isAdmin',
    AuthRequestValidators.validateIsAdmin,
    UserController.isAdmin
)


module.exports = router;