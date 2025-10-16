import { IconBus, IconCalendar, IconCheckList, IconHome, IconMapPin, IconPeople, IconSettings } from '@/components/Icons'
import type { Output, ParseTimestampOptions } from '@/env'
import { DEV } from '@/lib/constants'
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
  const hourMinuteSecond = `${padStart(hour, 2, '0')}:${padStart(zdt.minute, 2, '0')}:${padStart(zdt.second, 2, '0')}`
  const time = `${hourMinute}:${padStart(zdt.second, 2, '0')} ${sufix}`
  const date = `${padStart(zdt.day, 2, '0')}/${padStart(zdt.month, 2, '0')}/${padStart(zdt.year, 2, '0')}`
  
  const outputs: { [key in Output]: string } = {
    date,
    time,
    'hour-minute': `${hourMinute}`,
    'date-time': `${date} - ${time}`,
    'time-date': `${time} - ${date}`,
    'hh:mm:ss': `${hourMinuteSecond}`
  }

  return outputs[options.output]
}

export const links = [
  { name: 'Inicio', link: '/', Icon: IconHome },
  { name: 'Servicios', link: '/services/', Icon: IconCheckList },
  { name: 'Horarios', link: '/schedules/', Icon: IconCalendar },
  { name: 'Rutas', link: '/routes/', Icon: IconBus },
  { name: 'Viajes Personalizados', link: '/custom-trips/', Icon: IconSettings },
  { name: 'Seguimiento', link: '/track/', Icon: IconMapPin },
  { name: 'Nosotros', link: '/about/', Icon: IconPeople }
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

export function errorHandler (err: unknown, baseMessage?: string | null, canShow = DEV, ignoreNoMessage = false) {
  let errorToShow: string | unknown = ''

  if (err instanceof Error && baseMessage) {
    errorToShow = `${baseMessage}: ${err.message}`
  } else if (err instanceof Error) {
    errorToShow = err.message
  } else if (err && baseMessage) {
    errorToShow = `${baseMessage}: ${err}`
  } else if (baseMessage) {
    errorToShow = baseMessage
  } else if (!ignoreNoMessage) {
    errorToShow = `Error desconocido: ${err}`
  } else {
    errorToShow = err
  }

  if (canShow) {
    console.error(errorToShow)
    return errorToShow
  }

  return errorToShow
}

export function trackLog (context: 'WS' | 'HTTP', message: string, extra: Error | string | null | undefined = null, type: 'CHOFER' | 'USUARIO', id: string = 'unknown') {
  const now = Temporal.Now.instant()
  const time = parseTimestamp(now.epochMilliseconds, { format: '24 hrs', output: 'hh:mm:ss' })
  const identifier = `${type}/${id}`

  let extraMessage = ''
  if (extra instanceof Error) {
    extraMessage = extra.message
  } else if (typeof extra === 'string') {
    extraMessage = extra
  }

  console.log(`${time} [${context}] ${identifier} - ${message} ${extraMessage ? `: ${extraMessage}` : ''}`)
}
