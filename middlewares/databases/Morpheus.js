// PACOTE DO MSSQL
const mssql = require('mssql')

//CLASSE DE CONEXAO COM MORPHEUS
class Morpheus{

    constructor () {
        this.user = process.env.MORPHEUS_USER
        this.password = process.env.MORPHEUS_PASSWORD
        this.ip = process.env.MORPHEUS_IP
        this.stringConnection = `'mssql://${this.user}:${this.password}@${this.ip}:1433/morpheus'`
    }

    async consulta (sql) {
        try {
           
            await mssql.connect(this.stringConnection)
            const result = await mssql.query`${sql}`
            console.dir(result)
        } catch (err) {

            throw err
        }
    }
}

module.exports = Morpheus
