import { IconBed, IconBus, IconNoWC, IconWC } from '@/components/Icons'
import type { BusType, TripDetail, TripInfo, TripType, UruguayDepartments } from '@/env'

export const typesOfBuses: BusType[] = [
	{
		icon: IconBus,
		type: 'comun',
		title: 'Común',
		description: 'Servicio estándar con asientos cómodos y reclinables',
		details: [
			'Asientos reclinables',
			'Aire acondicionado',
			'Música ambiental',
			'Baño a bordo'
		],
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
		description: 'Mayor comodidad con servicios adicionales',
		details: [
			'Asientos más amplios',
			'Mayor reclinación',
			'WiFi gratuito',
			'Servicio de refrigerios'
		],
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
		description: 'Máximo confort para viajes largos',
		details: [
			'Asientos tipo semi-cama',
			'Entretenimiento a bordo',
			'Servicio de comidas',
			'Mantas y almohadas'
		],
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
		description: 'Lujo y comodidad premium',
		details: [
			'Asientos cama individuales',
			'TV personal',
			'Servicio gourmet',
			'Atención personalizada'
		],
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
	{ id: 'origin', title: 'Origen', type: 'select', options: uruguayDepartments, defaultOption: 'Selecciona origen' },
	{ id: 'desination', title: 'Destino', type: 'select', options: uruguayDepartments, defaultOption: 'Selecciona destino' },
	{ id: 'departure-date', title: 'Fecha de Ida', type: 'date-picker', epochMiliseconds: 0 },
	{ id: 'return-date', title: 'Fecha de Vuelta (Opcional)', type: 'date-picker', epochMiliseconds: 0 },
	{ id: 'departure-time', title: 'Hora de Ida', type: 'time-picker' },
	{ id: 'return-time', title: 'Hora de Vuelta', type: 'time-picker' },
	{ id: 'passengers-capacity', title: 'Número de Pasajeros', type: 'number', placeholder: 'Ej: 25' }
]

export const tripInfo: TripInfo[] = [
	{ id: 'comments', title: 'Comentarios o Solicitudes Especiales', type: 'textarea', placeholder: 'Describe cualquier requerimiento especial, paradas adicionales, o información relevante para tu viaje...' },
	{ id: 'full-name', title: 'Nombre Completo', type: 'text', placeholder: 'Juan Pérez' },
	{ id: 'company', title: 'Companía (opcional)', type: 'text', placeholder: 'Mi Empresa S.A.' },
	{ id: 'phone', title: 'Teléfono', type: 'tel', placeholder: '123 456 789' },
	{ id: 'mail', title: 'Email', type: 'email', placeholder: 'juanperez@mail.com' }
]
