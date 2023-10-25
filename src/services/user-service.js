const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw{error};
        }
    }

    async signIn(email, plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error: "Incorrect password"};
            }

            const newJwt = this.createToken({email: user.email, is: user.id});
            return newJwt;
        } catch (error) {
            console.log("Something went wrong in signin process");
            throw{error};
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid Token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in auth process");
            throw{error};
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in the token creation layer");
            throw error;
        }
    }
    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY) ;
            return response;
        } catch (error) {
            console.log("Something went wrong in the token validation");
            throw{error};
        }
    }

    checkPassword(userInputPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }
    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer for getting role");
            throw error;
        }
    }
}

module.exports = UserService;