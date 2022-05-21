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
const Ant = require('ant-plus');
const { settings } = require('./setting');
const stick = new Ant.GarminStick2();
const sensor = new Ant.HeartRateSensor(stick);
let heartbeat = 0;
let datetime = new Date();
function ServerSetting(entryPath, server) {
    sensor.on('hbData', function (data) {
        if (settings.deviceID == null ||
            settings.deviceID == data.DeviceID) {
            heartbeat = data.ComputedHeartRate;
            datetime = new Date();
        }
    });
    stick.on('startup', function () {
        sensor.attach(0, 0);
    });
    if (!stick.open()) {
        console.log('Stick が見つかりません(Stick not found.)');
    }
    server.get(entryPath, (request, reply) => __awaiter(this, void 0, void 0, function* () {
        return {
            heartbeatPoint: heartbeat,
            datetime: datetime.toISOString()
        };
    }));
}
module.exports = {
    settingFunc: ServerSetting
};
