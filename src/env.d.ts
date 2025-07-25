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

export type ParseTimestampOptions = {
  format: '12 hrs' | '24 hrs'
  output: Output
}

export type Output = 'date' | 'time' | 'date-time' | 'time-date' | 'hour-minute'

export interface Buses {
  inMovement?: number
  inTerminal?: number
  delayed?: number
  selectedCount: number
  count?: number
  busesData: Array<BusData>
  timestamp?: number
}

export interface BusData {
  id: string
  state: BusStates
  driver: Driver
  origin: {
    location: string
    timestamp: number
  }
  destination: {
    location: string
    timestamp: number
  }
  location: string
  passengers: {
    capacity: number,
    onBoard: number
  }
  progress: number
  selected: boolean
}

export type BusStates = 'En viaje' | 'En terminal' | 'Atrasado'

export interface Driver {
  id: string
  name: string
}

export type Ruta = {
  id: string
  tipo: 'directo' | 'semi-directo' | 'internacional',
  precio: number,
  origen: string,
  destino: string,
  duracion_en_minutos: number
  frecuencia_en_texto: string
  horas?: {
    hora: string,
    momento: 'mañana' | 'tarde' | 'noche'
  }[]
  horario?: string
  falta?: 'feriado' | 'roto'
}
