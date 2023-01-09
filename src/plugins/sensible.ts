'use strict'

import { PluginMetadata } from "fastify-plugin"

const fpSensible = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fpSensible(async function (fastify: any, opts: PluginMetadata | string = '') {
  fastify.register(require('@fastify/sensible'), {
    errorHandler: false
  })
  fastify.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    }
  })
})
