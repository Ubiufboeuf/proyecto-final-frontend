import { IconBed, IconBus, IconNoWC, IconWC } from '@/components/Icons'
import type { BusType, TripDetail, TripInfo, TripType, UruguayDepartments } from '@/env'

export const typesOfBuses: BusType[] = [
	{
		icon: IconBus,
		type: 'comun',
		title: 'Común',
		capacity: 46,
		tags: [
			{ tag: 'A/C', title: 'Aire Acondicionado' },
			{ tag: 'Baño', title: 'Baño' },
			{ tag: 'WiFi', title: 'WiFi' },
			{ tag: 'Heladera', title: 'Heladera' },
			{ tag: 'Cafetera', title: 'Cafetera' },
			{ tag: 'Pantallas', title: 'Pantallas' },
			{ tag: 'Música', title: 'Música' },
			{ tag: 'Asiento Cómodos', title: 'Asiento Cómodos' }
		],
		mainColor: '#1D4ED8',
		bgColor: '#EFF6FF',
		borderColor: '#BFDBFE',
		darkColor: '#335FDC'
	},
	{
		icon: IconBed,
		type: 'bed',
		title: 'Común - Semicama',
		capacity: 42,
		tags: [
			{ tag: 'A/C', title: 'Aire Acondicionado' },
			{ tag: 'Baño', title: 'Baño' },
			{ tag: 'WiFi', title: 'WiFi' },
			{ tag: 'Heladera', title: 'Heladera' },
			{ tag: 'Cafetera', title: 'Cafetera' },
			{ tag: 'Pantallas', title: 'Pantallas' },
			{ tag: 'Música', title: 'Música' },
			{ tag: 'Asiento Cómodos', title: 'Asiento Cómodos' },
			{ tag: 'Semicama', title: 'Semicama' }
		],
		mainColor: '#15803D',
		bgColor: '#F0FDF4',
		borderColor: '#BBF7D0',
		darkColor: '#2C8C50'
	},
	{
		icon: IconWC,
		type: 'micro',
		title: 'Micro',
		capacity: 28,
		tags: [
			{ tag: 'A/C', title: 'Aire Acondicionado' },
			{ tag: 'Baño', title: 'Baño' },
			{ tag: 'WiFi', title: 'WiFi' },
			{ tag: 'Pantallas', title: 'Pantallas' },
			{ tag: 'Música', title: 'Música' },
			{ tag: 'Asiento Cómodos', title: 'Asiento Cómodos' }
		],
		mainColor: '#7E22CE',
		bgColor: '#FAF5FF',
		borderColor: '#E9D5FF',
		darkColor: '#9b57d5'
	},
	{
		icon: IconNoWC,
		type: 'nowc',
		title: 'Micro - Sin Baño',
		capacity: 22,
		tags: [
			{ tag: 'A/C', title: 'Aire Acondicionado' },
			{ tag: 'WiFi', title: 'WiFi' },
			{ tag: 'Pantallas', title: 'Pantallas' },
			{ tag: 'Música', title: 'Música' },
			{ tag: 'Asiento Cómodos', title: 'Asiento Cómodos' }
		],
		mainColor: '#C2410C',
		bgColor: '#FFF7ED',
		borderColor: '#FED7AA',
		darkColor: '#C85424'
	}
]

export const tripTypes: TripType[] = [
  { id: 'day-trip', title: 'Excursion de un día', description: 'Viaje de ida y vuelta en el mismo día' },
  { id: 'weekend', title: 'Fin de semana', description: 'Viaje de 2-3 días con estadía' },
  { id: 'business-trip', title: 'Viaje corporativo', description: 'Transporte para empresas y eventos' },
  { id: 'school-trip', title: 'Viaje escolar', description: 'Transporte educativo y excursiones escolares' },
  { id: 'tourism', title: 'Turismo', description: 'Paquetes turísticos con múltiples destinos' },
  { id: 'special-event', title: 'Evento especial', description: 'Bodas, cumpleaños, celebraciones' }
]

const uruguayDepartments: UruguayDepartments[] = [
  { id: 'punta-del-este', name: 'Punta del Este' },
  { id: 'colonia-del-sacramento', name: 'Colonia del Sacramento' },
  { id: 'montevideo', name: 'Montevideo' },
  { id: 'paysandu', name: 'Paysandú' },
  { id: 'salto', name: 'Salto' },
  { id: 'rivera', name: 'Rivera' },
  { id: 'tacuarembo', name: 'Tacuarembó' },
  { id: 'melo', name: 'Melo' },
  { id: 'rocha', name: 'Rocha' },
  { id: 'la-paloma', name: 'La Paloma' },
  { id: 'cabo-polonio', name: 'Cabo Polonio' },
  { id: 'termas-del-dayman', name: 'Termas del Daymán' },
  { id: 'buenos-aires-argentina', name: 'Buenos Aires (Argentina)' },
  { id: 'sao-paulo-brasil', name: 'São Paulo (Brasil)' },
  { id: 'otro', name: 'Otro destino' }
]

export const tripDetails: TripDetail[] = [
	{ id: 'origin', title: 'Origen', formElementType: 'select', options: uruguayDepartments, defaultOption: 'Selecciona origen' },
	{ id: 'desination', title: 'Destino', formElementType: 'select', options: uruguayDepartments, defaultOption: 'Selecciona destino' },
	{ id: 'departure-date', title: 'Fecha de Ida', formElementType: 'date-picker', epochMiliseconds: 0 },
	{ id: 'return-date', title: 'Fecha de Vuelta (Opcional)', formElementType: 'date-picker', epochMiliseconds: 0 },
	{ id: 'departure-time', title: 'Hora de Ida', formElementType: 'time-picker' },
	{ id: 'return-time', title: 'Hora de Vuelta', formElementType: 'time-picker' },
	{ id: 'passengers-capacity', name: 'passengers-capacity', title: 'Número de Pasajeros', formElementType: 'input', type: 'number', placeholder: '46, 42, 28, 22 ...' }
]

export const tripInfo: TripInfo[] = [
	{ id: 'comments', name: 'comments', title: 'Comentarios o Solicitudes Especiales', formElementType: 'textarea', placeholder: 'Describe cualquier requerimiento especial, paradas adicionales, o información relevante para tu viaje...' },
	{ id: 'full-name', name: 'full-name', title: 'Nombre Completo', formElementType: 'input', type: 'text', placeholder: 'Juan Pérez' },
	{ id: 'company', name: 'company', title: 'Companía (opcional)', formElementType: 'input', type: 'text', placeholder: 'Mi Empresa S.A.' },
	{ id: 'phone', name: 'phone', title: 'Teléfono', formElementType: 'input', type: 'tel', placeholder: '123 456 789' },
	{ id: 'mail', name: 'mail', title: 'Email', formElementType: 'input', type: 'email', placeholder: 'juanperez@mail.com' }
]
