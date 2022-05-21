import { FastifyInstance } from 'fastify'
const Ant = require('ant-plus')
const { settings } = require('./setting')

const stick = new Ant.GarminStick2()
const sensor = new Ant.HeartRateSensor(stick)
let heartbeat = 0
let datetime = new Date()

function ServerSetting(entryPath: string, server: FastifyInstance) {
  sensor.on('hbData', function (data: any) {
    if (settings.deviceID == null ||
      settings.deviceID == data.DeviceID) {
      heartbeat = data.ComputedHeartRate
      datetime = new Date()
    }
  })

  stick.on('startup', function () {
    sensor.attach(0, 0)
  })

  if (!stick.open()) {
    console.log('Stick が見つかりません(Stick not found.)')
  }

  server.get(entryPath, async (request, reply) => {
    return {
      heartbeatPoint: heartbeat,
      datetime: datetime.toISOString()
    }
  })
}

module.exports = {
  settingFunc: ServerSetting
}