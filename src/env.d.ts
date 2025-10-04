import type { Marker } from 'leaflet'
import type { JSX } from 'preact/jsx-runtime'

export type Contact = {
  dept: string
  place: string
  number: string
  maps: string
}

export type LiveGeolocationSenderOptions = {
  id: string | null
  enableHighAccuracy: boolean
  timeout: number
  maximumAge: number
  sendCoordinates: boolean
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

export type Output = 'date' | 'time' | 'date-time' | 'time-date' | 'hour-minute' | 'hh:mm:ss'

export type BusesData = {
  inMovement?: number
  inTerminal?: number
  delayed?: number
  selectedCount: number
  count?: number
  buses: Array<Bus> | null
  timestamp?: number
}

export type Point = {
  x: number
  y: number
}

export type BusLocation = {
  city: string
  position: Point
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marker: Marker<any> | null
}

// Este lo recibe del servidor
export type BusLocationFromServer = BusLocation & {
  id: string
  type: string
}

export type Bus = {
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
  location: BusLocation
  route: {
    current: Point[]
    planned: Point[]
  }
  passengers: {
    capacity: number,
    onBoard: number
  }
  progress: number
  selected: boolean
}

export type BusStates = 'En viaje' | 'En terminal' | 'Atrasado'

export type Driver = {
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

export type BusType = {
  icon: () => JSX.Elememnt
  type: string
  title: string
  capacity: number
  tags: { tag: string, title: string }[]
  mainColor: string
  bgColor: string
  borderColor: string
  darkColor: string
}

export type HorarioDestacado = {
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

export type TripType = {
  id: TripTypeId
  title: string
  description: string
}

export type UruguayDepartments = {
  id: string
  name: string
}

export type PreferredTimeOptions = {
  id: string
  epochMiliseconds: number
}

export type FormSelect = {
  id: string
  title: string
  type: 'select'
  options: UruguayDepartments[]
  defaultOption: string
}

export type FormDatePicker = {
  id: string
  title: string
  type: 'date-picker'
  epochMiliseconds: number
}

export type FormTimePicker = {
  id: string
  title: string
  type: 'time-picker'
}

export type FormInputNumber = {
  id: string
  title: string
  type: 'number'
  placeholder: string
}

export type TripDetail = FormSelect | FormDatePicker | FormTimePicker | FormInputNumber

export type FormTextarea = {
  id: string
  title: string
  type: 'textarea'
  placeholder: string
}

export type FormInputText = {
  id: string
  title: string
  type: 'text'
  placeholder: string
}

export type FormInputEmail = {
  id: string
  title: string
  type: 'email'
  placeholder: string
}

export type FormInputPhone = {
  id: string
  title: string
  type: 'tel'
  placeholder: string
}

export type FormInput = FormInputText | FormInputNumber | FormInputEmail | FormInputPhone
export type TripInfo = FormTextarea | FormInputText | FormInputEmail | FormInputPhone
