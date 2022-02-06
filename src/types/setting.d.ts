interface Setting {
  deviceID: number?,
  reloadTime: number,
  viewEjsName: string?
}

type SettingRequest = FastifyRequest<{
  Querystring: Setting
}>