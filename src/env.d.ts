export interface Contact {
  dept: string
  place: string
  number: string
  maps: string
}

export type Options = {
  enableHighAccuracy?: boolean
  timeout?: number // Tiempo máximo para obtener la posición (en ms)
  maximumAge?: number // No usar posiciones cacheadas
  sendCoordinates?: boolean
}

export type CustomCoords = {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
  timestamp: number
}
