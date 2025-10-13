const http_endpoint = import.meta.env.PUBLIC_HTTP_ENDPOINT
const http_recorder_endpoint = import.meta.env.PUBLIC_HTTP_RECORDER_ENDPOINT
const ws_endpoint = import.meta.env.PUBLIC_WS_ENDPOINT
const { DEV } = import.meta.env

export const ENDPOINTS = {
  ROUTES: `${http_endpoint}/mocks/routes.json`,
  BUSES_DATA: `${http_endpoint}/mocks/buses_data.json`,
  HTTP: http_recorder_endpoint,
  WS: ws_endpoint,
  LOGOUT: `${http_endpoint}/api/logout`
}

export {
  DEV
}

export const WS_RESPONSE_TYPE = {
  BUS_POSITION: 'WS_TYPE_BUS_POSITION'
} as const

export const INDICATORS = {
  CONNECTION: {
    LOADING: 'INDICATORS_CONNECTION_LOADING',
    ENTABLISHED: 'INDICATORS_CONNECTION_ENTABLISHED',
    FAILED: 'INDICATORS_CONNECTION_FAILED',
    CLOSED: 'INDICATORS_CONNECTION_CLOSED'
  },
  TRACKING: {
    LOADING: 'INDICATORS_TRACKING_LOADING',
    LOADED: 'INDICATORS_TRACKING_LOADED',
    FAILED: 'INDICATORS_TRACKING_FAILED',
    STOPPED: 'INDICATORS_TRACKING_STOPPED',
    ID_MISSING: 'INDICATORS_TRACKING_ID_MISSING'
  }
} as const

export const SOCKET_EVENTS = {
  BUS_LOCATION: 'bus-location'
} as const
