interface Setting {
  deviceID: number?,
  reloadTime: number
}

type SettingRequest = FastifyRequest<{
  Querystring: Setting
}>