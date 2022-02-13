import { FastifyInstance } from 'fastify'
import * as fs from 'fs';
const { settings } = require('./setting')

const VIEW_PATH = 'views/ejs/heart-view.ejs'
const SCRIPT_PATH = './views/js/heart-view.js'
const GET_HEARTBEAT_URL = 'http://127.0.0.1:3000/heartbeat-point'
const TITLE = '心拍数表示ページ'

function ServerSetting(entryPath: string, server: FastifyInstance) {
  server.get(entryPath, async (request, reply) => {
    fs.readFile(SCRIPT_PATH, (err, file) => {
      const viewPath = settings.viewEjsName ? './customViews/' + settings.viewEjsName : VIEW_PATH
      reply.view(viewPath,
        {
          title: TITLE,
          script: file,
          settings: JSON.stringify(settings),
          getHeartbeatUrl: GET_HEARTBEAT_URL
        })
    });
  })
}

module.exports = {
  settingFunc: ServerSetting
}