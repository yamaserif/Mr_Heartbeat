import { FastifyInstance } from 'fastify'

const VIEW_PATH = 'views/ejs/menu.ejs'
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting'
const GET_HEART_VIEW_URL = 'http://127.0.0.1:3000/heart-view'
const TITLE = 'メニュー'

function ServerSetting(entryPath: string, server: FastifyInstance) {
  server.get(entryPath, async (request, reply) => {
    reply.view(VIEW_PATH, {
      title: TITLE,
      settingUrl: GET_SETTING_URL,
      heartViewUrl: GET_HEART_VIEW_URL
    })
  })
}

module.exports = {
  settingFunc: ServerSetting
}