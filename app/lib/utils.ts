import { Temporal } from 'temporal-polyfill'

export function parseTimestamp (timestamp: number) {
  const zdt = Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO('America/Montevideo')
  return `
    ${padStart(zdt.hour, 2, '0')}:${padStart(zdt.minute, 2, '0')}:${padStart(zdt.second, 2, '0')}
    -
    ${padStart(zdt.day, 2, '0')}/${padStart(zdt.month, 2, '0')}/${padStart(zdt.year, 2, '0')}`
}

const padStart = (val: number, length: number, fill: string) => val.toString().padStart(length, fill)
