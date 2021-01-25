const http = require('http');
const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const httpProxy = require('express-http-proxy')
require('dotenv').config()


module.exports = () => {   
    const app = express()
    const cookieParser = require('cookie-parser');
    const logger = require('morgan');
    const helmet = require('helmet');
    const jwt = require('./middlewares/auth/JsonWebToken')

    app.use(logger('dev'));
    app.use(helmet());
    app.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(jwt.verifyJWT())
    // consign adiciona as rotas da pasta controller para o roteador do express
    consign()
      .include('controllers')
      .into(app, httpProxy)
    
    var server = http.createServer(app);
    return server
}