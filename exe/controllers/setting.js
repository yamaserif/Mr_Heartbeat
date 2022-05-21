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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const VIEW_PATH = 'views/ejs/setting.ejs';
const SETTING_DATA_PATH = './settings.json';
const GET_MENU_URL = 'http://127.0.0.1:3000/';
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting';
const TITLE = '設定(Setting)';
const defaultSetting = {
    deviceID: null,
    reloadTime: 1000,
    restingHeartRate: 70,
    viewEjsName: null,
    custom: "" // カスタム設定の初期値なし
};
let loadSettingData = {};
try {
    loadSettingData = JSON.parse(fs_1.default.readFileSync(SETTING_DATA_PATH, 'utf8'));
}
catch (err) {
    console.log('設定値のファイルが見つかりませんでした(Setting value file could not be found.)');
}
let settings = Object.assign(defaultSetting, loadSettingData);
function ServerSetting(entryPath, server) {
    server.get(entryPath, (request, reply) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const paramDeviceID = typeof request.query.deviceID === 'undefined' ? settings.deviceID : parseInt(request.query.deviceID);
        const paramReloadTime = parseInt(request.query.reloadTime);
        const paramRestingHeartRate = parseInt(request.query.restingHeartRate);
        const paramViewEjsName = typeof request.query.viewEjsName === 'undefined' ? settings.viewEjsName : request.query.viewEjsName;
        const paramCustom = typeof request.query.custom === 'undefined' ? settings.custom : request.query.custom;
        settings.deviceID = Number.isNaN(paramDeviceID) ? null : paramDeviceID;
        settings.reloadTime = Number.isNaN(paramReloadTime) ? settings.reloadTime : paramReloadTime;
        settings.restingHeartRate = Number.isNaN(paramRestingHeartRate) ? settings.restingHeartRate : paramRestingHeartRate;
        settings.viewEjsName = paramViewEjsName === "" ? null : paramViewEjsName;
        settings.custom = paramCustom;
        fs_1.default.writeFile(SETTING_DATA_PATH, JSON.stringify(settings, null, '    '), (err) => {
            if (err) {
                console.log('設定値のファイル書き込みが失敗しました(File write of settings values failed.)');
            }
        });
        reply.view(VIEW_PATH, {
            title: TITLE,
            menuUrl: GET_MENU_URL,
            settingUrl: GET_SETTING_URL,
            deviceID: (_a = settings.deviceID) !== null && _a !== void 0 ? _a : 'すべてのデバイス(All device)',
            reloadTime: settings.reloadTime,
            restingHeartRate: settings.restingHeartRate,
            viewEjsName: (_b = settings.viewEjsName) !== null && _b !== void 0 ? _b : 'デフォルト(Default)',
            custom: settings.custom
        });
    }));
}
module.exports = {
    settings: settings,
    settingFunc: ServerSetting
};
