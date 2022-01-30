import { FastifyInstance, FastifyRequest } from 'fastify'
import * as fs from 'fs';
import { ReadableStreamBYOBRequest } from 'stream/web';
const { settings } = require('./setting')

const VIEW_PATH = 'views/ejs/heart-view.ejs'
const SCRIPT_PATH = './views/js/heart-view.js'
const GET_HEARTBEAT_URL = 'http://127.0.0.1:3000/heartbeat-point'
const TITLE = '心拍数表示ページ'

function ServerSetting(entryPath: string, server: FastifyInstance) {
  server.get(entryPath, async (request, reply) => {
    fs.readFile(SCRIPT_PATH, (err, file) => {
      reply.view(VIEW_PATH,
        {
          title: TITLE,
          script: file,
          reloadTime: settings.reloadTime,
          getHeartbeatUrl: GET_HEARTBEAT_URL
        })
    });
  })
}

module.exports = {
  settingFunc: ServerSetting
}