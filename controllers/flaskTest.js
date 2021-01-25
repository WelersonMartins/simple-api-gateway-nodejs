const Authentication = require('../middlewares/auth/JsonWebToken')
const Password = require('../middlewares/auth/Password')

module.exports = (app, httpProxy) => {
    
    const flaskApp = httpProxy(process.env.FLASK_APP);

    app.get('/',  (req, res, next) => {
        flaskApp(req, res, next)
    })

    app.get('/oi',  (req, res, next) => {
        flaskApp(req, res, next)
    })
}