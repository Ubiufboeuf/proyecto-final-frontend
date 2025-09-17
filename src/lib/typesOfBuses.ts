import { IconBed, IconBus, IconNoWC, IconWC } from '@/components/Icons'
import type { BusType } from '@/env'

export const typesOfBuses: BusType[] = [
	{
		icon: IconBus,
		title: 'Común',
		description: 'Servicio estándar con asientos cómodos y reclinables',
		details: [
			'Asientos reclinables',
			'Aire acondicionado',
			'Música ambiental',
			'Baño a bordo'
		],
		mainColor: '#1D4ED8',
		bgColor: '#EFF6FF',
		borderColor: '#BFDBFE',
		darkColor: '#335FDC'
	},
	{
		icon: IconBed,
		title: 'Común - Semicama',
		description: 'Mayor comodidad con servicios adicionales',
		details: [
			'Asientos más amplios',
			'Mayor reclinación',
			'WiFi gratuito',
			'Servicio de refrigerios'
		],
		mainColor: '#15803D',
		bgColor: '#F0FDF4',
		borderColor: '#BBF7D0',
		darkColor: '#2C8C50'
	},
	{
		icon: IconWC,
		title: 'Micro',
		description: 'Máximo confort para viajes largos',
		details: [
			'Asientos tipo semi-cama',
			'Entretenimiento a bordo',
			'Servicio de comidas',
			'Mantas y almohadas'
		],
		mainColor: '#7E22CE',
		bgColor: '#FAF5FF',
		borderColor: '#E9D5FF',
		darkColor: '#8B38D3'
	},
	{
		icon: IconNoWC,
		title: 'Micro - Sin Baño',
		description: 'Lujo y comodidad premium',
		details: [
			'Asientos cama individuales',
			'TV personal',
			'Servicio gourmet',
			'Atención personalizada'
		],
		mainColor: '#C2410C',
		bgColor: '#FFF7ED',
		borderColor: '#FED7AA',
		darkColor: '#C85424'
	}
]
