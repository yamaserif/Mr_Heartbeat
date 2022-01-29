import fastify from 'fastify'
const sensible = require('../plugins/sensible')
const support = require('../plugins/support')

const server = fastify()
sensible(server)
support(server)

const VIEW_NAME = 'views/index.ejs';

server.get('/', async (request, reply) => {
    reply.view(VIEW_NAME, { var01: 'test!!' })
})

server.listen(8080, (err, address) => {
  if (err) throw err;
  console.log(`server listening on ${address}`)
})