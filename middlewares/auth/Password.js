const bcrypt = require('bcryptjs')


class Password {
    /**
     * Cria um hash em bvrypt para o conjunto de caracteres informados
     * @param {String} senhaPura 
     */
    create (senhaPura) {

        return bcrypt.hashSync(senhaPura, 10);
    }

    compare (senha, hash) {

        return bcrypt.compareSync(senha, hash);
    }

    reset(){
        // todo: fazer reset
    }

}

module.exports = Password