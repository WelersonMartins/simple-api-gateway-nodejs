const jwt = require('jsonwebtoken');
const base64 = require('js-base64')
const bcrypt = require('./Password')
const Morpheus = require('../databases/Morpheus')


class JsonWebToken {

    /**
     *  cria um hash de senha
     */
    create(req, res, next){
        try {
            
            // decoda a senha e password do header de autorizacao que está em base64
            try {
                var decoded = base64.decode(req.headers['authorization'])
            }catch{
               return res.status(401).json({ auth: false, message: 'Verifique se informou usuario/senha na requisição no header authorization' });
            }
            

            // caso não vier o header de autorization com o usuario e senha em base64
            
           
            // split para dividir usuário em senha em um array
            const dados = decoded.split(':')    
            // pega dados do usuário do login informado
            const user = dados[0]
            const password = dados[1]
            // cria a string de conexao com o banco
            const sql = `select top 1 1, 'helinho', '$2a$10$vr.oIhnVTLK4AGNU39z0Iet4vP/E5LJczUSPAC1Z.10zXRZ2GOxIi' from SAB_USUARIOS_SISTEMA (NOLOCK) `
            // faz a consulta no banco chamando a classe databases/Morpheus
            const consulta_banco = new Morpheus().consulta(sql)
            // se o usuário existe precisa comparar o hash do password do banco com a senha vinda na requisição
            const verifyPass = new bcrypt().compare(password, password_hash)
            // se a senha é a mesma que o hash do banco
            if (verifyPass) {

                // criar o jwt dai, dai depois é so dar um app.use nisso  
                const id = 1; //esse id viria do banco de dados
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 3600 // expires in 60min
                });
                return res.status(200).json({ auth: true, token: token });
            }
            else {

                throw new Error("A senha ou usuário informados não conferem.");
            }

        }catch (err) {

            res.status(400).json({
                message: err.message
            })
        }

       
    }
  

    verify (req, res, next) {
        // se a rota for qualquer outra fora a de login, precisa de um token jwt válido para acessar
        if (req.originalUrl != '/login') {

            const token = req.headers['x-access-token'];
        
            console.log(token)
    
            if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token informado.' });
            
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
    
                // se retornar erro na verificacao do token retorna para o cliente erro 500
                if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação do token.' });
                
                // se tudo estiver ok, salva no request para uso posterior
                
                req.userId = decoded.id;    
                
            }); 
        } 
        next();  
    }
}

module.exports = JsonWebToken