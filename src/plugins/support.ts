'use strict'

import { PluginMetadata } from "fastify-plugin"

const fpSupport = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fpSupport(async function (fastify : any, opts: PluginMetadata | string = '') {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })
})
