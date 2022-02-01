"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const VIEW_PATH = 'views/ejs/setting.ejs';
const GET_MENU_URL = 'http://127.0.0.1:3000/';
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting';
const TITLE = '設定';
const defaultSetting = {
    deviceID: null,
    reloadTime: 1000 // データ更新頻度(1000ms)
};
let settings = defaultSetting;
function ServerSetting(entryPath, server) {
    server.get(entryPath, (request, reply) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const paramDeviceID = parseInt(request.query.deviceID);
        const paramReloadTime = parseInt(request.query.reloadTime);
        settings.deviceID = Number.isNaN(paramDeviceID) ? null : paramDeviceID;
        settings.reloadTime = Number.isNaN(paramReloadTime) ? settings.reloadTime : paramReloadTime;
        reply.view(VIEW_PATH, {
            title: TITLE,
            menuUrl: GET_MENU_URL,
            settingUrl: GET_SETTING_URL,
            deviceID: (_a = settings.deviceID) !== null && _a !== void 0 ? _a : 'すべてのデバイス',
            reloadTime: settings.reloadTime
        });
    }));
}
module.exports = {
    settings: settings,
    settingFunc: ServerSetting
};
