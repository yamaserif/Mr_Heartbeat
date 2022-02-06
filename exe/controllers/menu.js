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
const VIEW_PATH = 'views/ejs/menu.ejs';
const GET_SETTING_URL = 'http://127.0.0.1:3000/setting';
const GET_HEART_VIEW_URL = 'http://127.0.0.1:3000/heart-view';
const TITLE = 'メニュー';
function ServerSetting(entryPath, server) {
    server.get(entryPath, (request, reply) => __awaiter(this, void 0, void 0, function* () {
        reply.view(VIEW_PATH, {
            title: TITLE,
            settingUrl: GET_SETTING_URL,
            heartViewUrl: GET_HEART_VIEW_URL
        });
    }));
}
module.exports = {
    settingFunc: ServerSetting
};
