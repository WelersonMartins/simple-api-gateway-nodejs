// o index.js apenas sobe o server.
// para as configurações do servidor http acesse o arquivo server.js
const server = require('./server')
const s = server()
s.listen(3000);