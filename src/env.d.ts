import type { JSX } from 'preact/jsx-runtime'

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

export interface BusesData {
  inMovement?: number
  inTerminal?: number
  delayed?: number
  selectedCount: number
  count?: number
  buses: Array<Bus> | null
  timestamp?: number
}

export interface Bus {
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
  faltas: {
    fecha: string,
    miliseconds: number
    motivo: 'feriado' | 'roto' | 'fin de semana'
  }[] | [undefined | null] | undefined | null
}

export type ColorTheme = 'dark' | 'light' | 'system'

export type ThemeOptions = {
  name: string
  theme: ColorTheme
  icon: ({ hidden }: { hidden?: boolean }) => JSX.Element  
}

export type Cookie = {
  cookie: string
  value: string
}

export type BusTypesIcons = Record<string, () => JSX.Element>

export interface BusType {
  icon: () => JSX.Elememnt
  type: string
  title: string
  description: string
  details: string[]
  capacity: number
  tags: { tag: string, title: string }[]
  mainColor: string
  bgColor: string
  borderColor: string
  darkColor: string
}

export interface HorarioDestacado {
  title: string
  description: string
  hours: (`${number}:${number}`)[]
  bgColor: `#${string}`
  bg2Color: `#${string}`
  mainColor: `#${string}`
  color: `#${string}`
  darkColor: `#${string}`
}

export type TripTypeId = 'day-trip' | 'weekend' | 'business-trip' | 'school-trip' | 'tourism' | 'special-event'

export interface TripType {
  id: TripTypeId
  title: string
  description: string
}

export interface UruguayDepartments {
  id: string
  name: string
}

export interface PreferredTimeOptions {
  id: string
  epochMiliseconds: number
}

export interface FormSelect {
  id: string
  title: string
  type: 'select'
  options: UruguayDepartments[]
  defaultOption: string
}

export interface FormDatePicker {
  id: string
  title: string
  type: 'date-picker'
  epochMiliseconds: number
}

export interface FormTimePicker {
  id: string
  title: string
  type: 'time-picker'
}

export interface FormInputNumber {
  id: string
  title: string
  type: 'number'
  placeholder: string
}

export type TripDetail = FormSelect | FormDatePicker | FormTimePicker | FormInputNumber

export interface FormTextarea {
  id: string
  title: string
  type: 'textarea'
  placeholder: string
}

export type TripInfo = FormTextarea
