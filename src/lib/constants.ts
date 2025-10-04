const origen = import.meta.env.PUBLIC_ORIGIN
const { DEV } = import.meta.env

export const ENDPOINTS = {
  ROUTES: `${origen}/mocks/routes.json`,
  BUSES_DATA: `${origen}/mocks/buses_data.json`,
  WS: 'ws://localhost:8080'
}

export {
  DEV
}

export const WS_TYPE_BUS_POSITION = 'WS_TYPE_BUS_POSITION'
