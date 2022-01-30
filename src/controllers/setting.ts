import { FastifyInstance } from 'fastify'

const VIEW_PATH = 'views/ejs/setting.ejs'
const GET_MENU_URL = 'http://127.0.0.1:3000/'
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting'
const TITLE = '設定'
const defaultSetting: Setting = {
  deviceID: null, // デバイスの指定なし
  reloadTime: 1000 // データ更新頻度(1000ms)
}

let settings = defaultSetting

function ServerSetting(entryPath: string, server: FastifyInstance) {
  server.get(entryPath, async (request: SettingRequest, reply) => {
    const paramDeviceID = parseInt(request.query.deviceID)
    const paramReloadTime = parseInt(request.query.reloadTime)
    settings.deviceID = Number.isNaN(paramDeviceID) ? null : paramDeviceID
    settings.reloadTime = Number.isNaN(paramReloadTime) ? settings.reloadTime : paramReloadTime

    reply.view(VIEW_PATH, {
      title: TITLE,
      menuUrl: GET_MENU_URL,
      settingUrl: GET_SETTING_URL,
      deviceID: settings.deviceID ?? 'すべてのデバイス',
      reloadTime: settings.reloadTime
    })
  })
}

module.exports = {
  settings: settings,
  settingFunc: ServerSetting
}