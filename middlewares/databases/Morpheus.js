// PACOTE DO MSSQL
const mssql = require('mssql')

//CLASSE DE CONEXAO COM MORPHEUS
class Morpheus{

    constructor (user, password, ip, database) {
        this.user = user || process.env.MORPHEUS_USER
        this.password = password || process.env.MORPHEUS_PASSWORD
        this.ip =  ip || process.env.MORPHEUS_IP
        this.database = database || process.env.MORPHEUS_DATABASE
        this.stringConnection = `mssql://${this.user}:${this.password}@${this.ip}/MORPHEUS`
    }

    async consulta (sql) {
        const config = {
            user: this.user,
            password: this.password,
            server: '192.168.50.24', // You can use 'localhost\\instance' to connect to named instance
            database: 'MORPHEUS',
            "options": {
                "encrypt": true,
                "enableArithAbort": true
                }
        }
        try {
           
            await mssql.connect(config).then(() => {
                return sql.query`${sql}`
            }).then(result => {
                console.dir(result)
                return result
            }).catch(err => {
                // ... error checks
            })
            const result = await mssql.query`${sql}`
            console.dir(result)
            return result
        } catch (err) {

            throw err
        }
    }
}

module.exports = Morpheus
