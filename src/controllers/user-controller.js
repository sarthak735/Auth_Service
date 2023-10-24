const UserService = require('../services/user-service');

const {response}  = require('express');

const userService = new UserService();

const create = async(req, res) =>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            success: true,
            data: response,
            message: 'Successfully created the user',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: error
        })
    }
}
const signin = async(req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: "Successfully signed in"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong in signin',
            err: error
        })
    }
}

module.exports ={
    create,
    signin
}