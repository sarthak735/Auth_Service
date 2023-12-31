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

const isAuthenticated = async(req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);

        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: "User is authenticated and token is valid "
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

const isAdmin = async(req, res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            sucess: true,
            messgae: 'Successfully fetched that user is admin',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong in getting user role',
            err: error
        })
    }
}

module.exports ={
    create,
    signin,
    isAuthenticated,
    isAdmin
}