import { IconBus, IconCheckList, IconHome, IconMapPin, IconPeople, IconPhone, IconSettings } from '@/components/Icons'
import type { Output, ParseTimestampOptions } from '@/env'
import { Temporal } from 'temporal-polyfill'

const padStart = (val: number, length: number, fill: string) => val.toString().padStart(length, fill)

const defaultOptions: ParseTimestampOptions = {
  format: '24 hrs',
  output: 'time-date'
}

export function parseTimestamp (timestampInMiliseconds: number, options: ParseTimestampOptions = defaultOptions) {
  const zdt = Temporal.Instant.fromEpochMilliseconds(timestampInMiliseconds).toZonedDateTimeISO('America/Montevideo')
  let sufix = ''
  let hour = zdt.hour
  if (options.format === '12 hrs') {
    sufix = zdt.hour > 12 ? 'PM' : 'AM'
    hour = hour - 12
  }

  const hourMinute = `${padStart(hour, 1, '0')}:${padStart(zdt.minute, 2, '0')}`
  const time = `${hourMinute}:${padStart(zdt.second, 2, '0')} ${sufix}`
  const date = `${padStart(zdt.day, 2, '0')}/${padStart(zdt.month, 2, '0')}/${padStart(zdt.year, 2, '0')}`
  
  const outputs: { [key in Output]: string } = {
    date,
    time,
    'hour-minute': `${hourMinute}`,
    'date-time': `${date} - ${time}`,
    'time-date': `${time} - ${date}`
  }

  return outputs[options.output]
}

export const links = [
  { name: 'Inicio', link: '/', Icon: IconHome },
  { name: 'Servicios', link: '/services/', Icon: IconCheckList },
  { name: 'Rutas', link: '/routes/', Icon: IconBus },
  { name: 'Viajes Personalizados', link: '/custom-trips/', Icon: IconSettings },
  { name: 'Seguimiento', link: '/track/', Icon: IconMapPin },
  { name: 'Nosotros', link: '/about/', Icon: IconPeople },
  { name: 'Contacto', link: '/contact/', Icon: IconPhone }
]

export function parseTimeInMinutes (time: number, output: 'h-mm') {
  const t = time

  const hour = `${Math.floor(t / 60)}`
  const minute = `${t % 60}`

  const h_mm = `${hour}h ${minute.padStart(2, '0')}min`

  const outputs = {
    'h-mm': `${h_mm}`
  }

  return outputs[output]
}
