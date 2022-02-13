interface Setting {
  deviceID: number?,
  reloadTime: number,
  restingHeartRate: number,
  viewEjsName: string?,
  custom: string?
}

type SettingRequest = FastifyRequest<{
  Querystring: Setting
}>