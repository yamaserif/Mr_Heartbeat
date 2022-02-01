import fastify from 'fastify'

function setRoutes() {
  const server = fastify()

  const sensible = require('../plugins/sensible')
  const support = require('../plugins/support')

  const CONTROLLER_PATH = '../controllers/'

  const pages = [
    { controller: 'menu', path: '/' },
    { controller: 'setting', path: '/setting' },
    { controller: 'heart-view', path: '/heart-view' },
    { controller: 'heartbeat-point', path: '/heartbeat-point' }
  ]

  sensible(server)
  support(server)

  for (const page of pages) {
    const { settingFunc } = require(CONTROLLER_PATH + page.controller)
    settingFunc(page.path, server)
  }

  server.listen(3000, (err, address) => {
    if (err) throw err;
    console.log(`server listening on ${address}`)
  })
}

module.exports = {
  setRoutes: setRoutes
}