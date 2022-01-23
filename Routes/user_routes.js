const express = require('express');
const router = express.Router();
const User = require("../Models/user_model");
const userController = require("../Controllers/user_controller");
const { check, validationResult } = require('express-validator');
const auth = require("../Middlewares/auth");
const upload = require("../Middlewares/upload");

router.get('/user/show', auth.verifyUser, auth.verifyAdmin, userController.show_user);

router.post('/user/register',
    [
        check('firstname', "FirstName is required").not().isEmpty(),
        check('lastname', "LastName is required").not().isEmpty(),
        check('gender', "Gender is required!!").not().isEmpty(),
        check('country', "Country is required").not().isEmpty(),
        check('username', "UserName is required!!").not().isEmpty()
            .custom(async (username) => {
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("Username already exits" );
                }
            }),
        check('password', "Password must be atleast of 8 character").not().isEmpty().isLength({ min: 8 }),
        check('club', "FavClub is required").not().isEmpty(),
        check('email', "email is required").isEmail().normalizeEmail()
            .custom(async (email) => {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error('Email already in use');
                }
            })
    ],
    userController.insert_user);

router.put('/user/update/:id', auth.verifyUser, userController.update_user);
router.put('/user/uploadProfile/:id', upload.single('image'), userController.uploadImage);

router.delete('/user/delete/:id', auth.verifyUser, userController.delete_user);
router.post('/user/authenticate', userController.authenticate_user);

module.exports = router;

