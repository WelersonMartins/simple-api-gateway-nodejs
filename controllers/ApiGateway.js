const Authentication = require('../middlewares/auth/JsonWebToken')
const Password = require('../middlewares/auth/Password')

module.exports = (app, httpProxy) => {
    
    var auth = new Authentication()
    const app1 = httpProxy(`${process.env.API_GATEWAY_URL}:${process.env.API_GATEWAY_PORT}`);
        
    app.get('/login', (req, res, next) => {

        auth.create(req, res, next)
      })

    app.get('/dashboard', (req, res, next) => {

        auth.verify,JWT(req, res, next)
    })

    app.get('/passwd', (req, res, next) => {

        var p = new Password()
        var hash = p.create('teste')
        console.log(hash)
        console.log(p.compare('teste', hash))

    })

}