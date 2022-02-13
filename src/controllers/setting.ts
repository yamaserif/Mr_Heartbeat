import { FastifyInstance } from 'fastify'

const VIEW_PATH = 'views/ejs/setting.ejs'
const GET_MENU_URL = 'http://127.0.0.1:3000/'
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting'
const TITLE = '設定'
const defaultSetting: Setting = {
  deviceID: null, // デバイスの指定なし
  reloadTime: 1000, // データ更新頻度(1000ms)
  restingHeartRate: 60, // 安静時心拍数(60bpm)
  viewEjsName: null, // デフォルトのビュー定義を使用
  custom: null // カスタム設定の初期値なし
}

let settings = defaultSetting

function ServerSetting(entryPath: string, server: FastifyInstance) {
  server.get(entryPath, async (request: SettingRequest, reply) => {
    const paramDeviceID = typeof request.query.deviceID === 'undefined' ? settings.deviceID : parseInt(request.query.deviceID)
    const paramReloadTime = parseInt(request.query.reloadTime)
    const paramRestingHeartRate = parseInt(request.query.restingHeartRate)
    const paramViewEjsName = typeof request.query.viewEjsName === 'undefined' ? settings.viewEjsName : request.query.viewEjsName
    const paramCustom = typeof request.query.custom === 'undefined' ? settings.custom : request.query.custom
    
    settings.deviceID = Number.isNaN(paramDeviceID) ? null : paramDeviceID
    settings.reloadTime = Number.isNaN(paramReloadTime) ? settings.reloadTime : paramReloadTime
    settings.restingHeartRate = Number.isNaN(paramRestingHeartRate) ? settings.restingHeartRate : paramRestingHeartRate
    settings.viewEjsName = paramViewEjsName === "" ? null : paramViewEjsName
    settings.custom = paramCustom

    reply.view(VIEW_PATH, {
      title: TITLE,
      menuUrl: GET_MENU_URL,
      settingUrl: GET_SETTING_URL,
      deviceID: settings.deviceID ?? 'すべてのデバイス',
      reloadTime: settings.reloadTime,
      restingHeartRate: settings.restingHeartRate,
      viewEjsName: settings.viewEjsName ?? 'デフォルト',
      custom: settings.custom
    })
  })
}

module.exports = {
  settings: settings,
  settingFunc: ServerSetting
}