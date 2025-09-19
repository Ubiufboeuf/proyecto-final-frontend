// import { IconBed, IconBus, IconNoWC, IconWC } from '@/components/Icons'
import type { BusType } from '@/env'

export const typesOfBuses: BusType[] = [
	{
		icon: 'IconBus',
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
		icon: 'IconBed',
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
		icon: 'IconWC',
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
		icon: 'IconNoWC',
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
