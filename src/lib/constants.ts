const origen = import.meta.env.PUBLIC_ORIGIN
const { DEV } = import.meta.env

export const ENDPOINTS = {
  ROUTES: `${origen}/mocks/routes.json`,
  BUSES_DATA: `${origen}/mocks/buses_data.json`
}

export {
  DEV
}
