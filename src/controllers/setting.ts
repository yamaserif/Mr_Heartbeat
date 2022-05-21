import { FastifyInstance } from 'fastify'
import fs from 'fs';

const VIEW_PATH = 'views/ejs/setting.ejs'
const SETTING_DATA_PATH = './settings.json'
const GET_MENU_URL = 'http://127.0.0.1:3000/'
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting'
const TITLE = '設定(Setting)'
const defaultSetting: Setting = {
  deviceID: null, // デバイスの指定なし
  reloadTime: 1000, // データ更新頻度(1000ms)
  restingHeartRate: 70, // 安静時心拍数(70bpm)
  viewEjsName: null, // デフォルトのビュー定義を使用
  custom: "" // カスタム設定の初期値なし
}

let loadSettingData = {}
try {
  loadSettingData = JSON.parse(fs.readFileSync(SETTING_DATA_PATH, 'utf8'))
} catch(err) {
  console.log('設定値のファイルが見つかりませんでした(Setting value file could not be found.)')
}

let settings = Object.assign(defaultSetting, loadSettingData)

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

    fs.writeFile(SETTING_DATA_PATH,
                 JSON.stringify(settings, null, '    '),
                 (err) => {
                   if (err){
                     console.log('設定値のファイル書き込みが失敗しました(File write of settings values failed.)')
                   }
                 }
    )

    reply.view(VIEW_PATH, {
      title: TITLE,
      menuUrl: GET_MENU_URL,
      settingUrl: GET_SETTING_URL,
      deviceID: settings.deviceID ?? 'すべてのデバイス(All device)',
      reloadTime: settings.reloadTime,
      restingHeartRate: settings.restingHeartRate,
      viewEjsName: settings.viewEjsName ?? 'デフォルト(Default)',
      custom: settings.custom
    })
  })
}

module.exports = {
  settings: settings,
  settingFunc: ServerSetting
}