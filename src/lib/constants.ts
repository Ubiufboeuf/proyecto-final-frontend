const http_endpoint = import.meta.env.PUBLIC_HTTP_ENDPOINT
const ws_endpoint = import.meta.env.PUBLIC_WS_ENDPOINT
const { DEV } = import.meta.env

export const ENDPOINTS = {
  ROUTES: `${http_endpoint}/mocks/routes.json`,
  BUSES_DATA: `${http_endpoint}/mocks/buses_data.json`,
  WS: ws_endpoint
}

export {
  DEV
}

export const WS_RESPONSE_TYPE = {
  BUS_POSITION: 'WS_TYPE_BUS_POSITION'
} as const
