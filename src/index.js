const express = require('express');

const {PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const UserService = require('./services/user-service')

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    app.use('/api', apiRoutes);

    app.listen(PORT, async () =>{
        console.log(`Server started on prt: ${PORT}`);

        const service = new UserService();
        const newToken = service.createToken({email: 'sarthak735@gmail.com', id: 1});
        console.log("new token is", newToken);
    })
}

prepareAndStartServer();