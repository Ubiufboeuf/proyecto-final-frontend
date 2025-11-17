const local_endpoint = import.meta.env.PUBLIC_LOCAL_ENDPOINT
const http_endpoint = import.meta.env.PUBLIC_HTTP_ENDPOINT
const http_recorder_endpoint = import.meta.env.PUBLIC_HTTP_RECORDER_ENDPOINT
const ws_endpoint = import.meta.env.PUBLIC_WS_ENDPOINT
const { DEV } = import.meta.env

const SESSION_COOKIE_NAME = 'berrutti-web-auth-token'

export const ENDPOINTS = {
  ROUTES: `${local_endpoint}/mocks/routes.json`,
  BUSES_DATA: `${local_endpoint}/mocks/buses_data.json`,
  HTTP_RECORDER: http_recorder_endpoint,
  HTTP: http_endpoint,
  WS: ws_endpoint,
  LOGOUT: `${http_endpoint}/http.php?action=logout`,
  LOGIN: `${http_endpoint}/http.php?action=login`,
  REGISTER: `${http_endpoint}/http.php?action=registrar`
} as const

export {
  DEV,
  SESSION_COOKIE_NAME
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
    START: 'INDICATORS_TRACKING_START',
    STOP: 'INDICATORS_TRACKING_STOP',
    STOPPED: 'INDICATORS_TRACKING_STOPPED',
    ID_MISSING: 'INDICATORS_TRACKING_ID_MISSING'
  }
} as const

export const SOCKET_EVENTS = {
  BUS_LOCATION: 'bus-location'
} as const

export const userFriendlyConectionStates: Record<typeof INDICATORS.CONNECTION[keyof typeof INDICATORS.CONNECTION], string> = {
  [INDICATORS.CONNECTION.FAILED]: 'Seguimiento fallido',
  [INDICATORS.CONNECTION.ENTABLISHED]: 'Conexión establecida!',
  [INDICATORS.CONNECTION.LOADING]: 'Conectando...',
  [INDICATORS.CONNECTION.CLOSED]: 'Conexión cerrada'
} as const

export const userFriendlyTrackingStates: Record<typeof INDICATORS.TRACKING[keyof typeof INDICATORS.TRACKING], string> = {
  [INDICATORS.TRACKING.FAILED]: 'Seguimiento fallido',
  [INDICATORS.TRACKING.LOADED]: 'Siguiendo!',
  [INDICATORS.TRACKING.LOADING]: 'Cargando...',
  [INDICATORS.TRACKING.STOPPED]: 'Seguimiento detenido',
  [INDICATORS.TRACKING.STOP]: 'Detener seguimiento',
  [INDICATORS.TRACKING.START]: 'Iniciar seguimiento',
  [INDICATORS.TRACKING.ID_MISSING]: 'Falta especificar un ID'
} as const
