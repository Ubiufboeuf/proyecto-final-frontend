import type { Ruta } from '@/env'
import { Icon } from '@/components/Icon'
import { IconArrowLeft, IconBus, IconClock, IconCalendar } from '@/components/Icons'
import { parseTimeInMinutes } from '@/lib/utils'
import { useRoutesModal } from '@/stores/useRoutesModal'
import { Temporal } from 'temporal-polyfill'
import { useEffect, useRef, useState } from 'preact/compat'

// const hoy = Temporal.Now.instant()
// // console.log(hoy.epochMilliseconds)
// const { day, month, year } = hoy.toZonedDateTimeISO(Temporal.Now.timeZoneId())
// // const { day, month, year } = Temporal.Now.zonedDateTimeISO()

export function RouteCard (ruta: Ruta) {
  const { id, tipo, precio, origen, destino, duracion_en_minutos, horas, horario, faltas: absence_data, frecuencia_en_texto } = ruta
  
  const isModalOpen = useRoutesModal((state) => state.isModalOpen)
  const setIsModalOpen = useRoutesModal((state) => state.setIsModalOpen)
  const setModalInfo = useRoutesModal((state) => state.setModalInfo)
  const [falta, setFalta] = useState(false)
  const [loadingMissingState, setLoadingMissingState] = useState(true)
  const missingIndicatorRef = useRef<HTMLSpanElement>(null)
  const missingLoadingRef = useRef<HTMLDivElement>(null)

  function toggleModal () {
    setIsModalOpen(!isModalOpen)
    setModalInfo(ruta)
  }

  function getWhenMissing (hoy: Temporal.Instant = Temporal.Now.instant()) {
    if (!absence_data?.[0]?.miliseconds) return
    // console.log(absence_data)
    // const hoy = Temporal.Now.instant()
    // console.log(absence_data?.[0]?.miliseconds > hoy.epochMilliseconds)

    const timeZone = Temporal.Now.timeZoneId()
    const savedInstant = Temporal.Instant.fromEpochMilliseconds(absence_data?.[0]?.miliseconds || 0)
    const savedZDT = savedInstant.toZonedDateTimeISO(timeZone)
    const zdt = hoy.toZonedDateTimeISO(timeZone)
    const { years, months, weeks, days, hours, minutes, seconds } = zdt.until(savedZDT, { smallestUnit: 'second', largestUnit: 'years' })
    // console.log(`${days}/${months}/${years} - ${hours}:${minutes}:${seconds}`)

    let missingTime = 'ahora'
    if (years > 1) missingTime = `en ${years} años`
    else if (years) missingTime = `en ${years} año`
    else if (months > 1) missingTime = `en ${months} meses`
    else if (months) missingTime = `en ${months} mes`
    else if (weeks > 1) missingTime = `en ${weeks} semanas`
    else if (weeks) missingTime = `en ${weeks} semana`
    else if (days > 1) missingTime = `en ${days} días`
    else if (days) missingTime = `en ${days} día`
    else if (hours > 1) missingTime = `en ${hours} horas`
    else if (hours) missingTime = `en ${hours} hora`
    else if (minutes > 10) missingTime = `en ${minutes} minutos`

    return missingTime
  }

  function updateWhenMissing (hoy: Temporal.Instant) {
    if (!missingIndicatorRef.current) return
    const ref = missingIndicatorRef.current
    const missingTime = getWhenMissing(hoy)
    if (ref.textContent !== `Falta ${missingTime}`) {
      ref.textContent = `Falta ${missingTime}`
    }
  }

  function intervalFn () {
    const hoy = Temporal.Now.instant()
    const { day, month, year } = hoy.toZonedDateTimeISO(Temporal.Now.timeZoneId())
    setFalta(absence_data?.[0]?.fecha === `${day}/${month}/${year}` && absence_data?.[0]?.miliseconds > hoy.epochMilliseconds)
    updateWhenMissing(hoy)
  }

  useEffect(() => {
    intervalFn()
    
    const id = setInterval(intervalFn, 900000)

    return () => {
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (loadingMissingState && missingLoadingRef.current) {
      setLoadingMissingState(false)
      missingLoadingRef.current.hidden = true
    }
  }, [falta])

  return (
    <article class={`${falta ? 'bg-gray-200 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-700/50'} h-full w-full overflow-hidden flex flex-col justify-between rounded-lg boder border border-gray-300 py-6 px-6 gap-4 dark:border-0`}>
      <section class='h-fit w-full flex justify-between items-center'>
        <div class='flex h-fit w-fit flex-wrap gap-1 items-center'>
          <span
            class={`${falta
              ? 'text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-500/50'
              : tipo === 'internacional'
                ? 'text-blue-700 bg-blue-100'
                : 'text-amber-700 bg-orange-100 dark:bg-orange-600/90 dark:text-gray-100'
              }
              h-fit overflow-hidden w-fit text-xs first-letter:uppercase p-1 px-3 rounded-full font-semibold
            `}
          >
            {tipo}
          </span>
          <span
            ref={missingIndicatorRef}
            class={`${falta
              ? 'text-gray-700 bg-gray-100 dark:text-gray-200 dark:bg-gray-500/50'
              : 'text-yellow-700 bg-yellow-100'
              }
              h-fit overflow-hidden w-fit text-xs first-letter:uppercase p-1 px-3 rounded-full font-semibold
            `}
            hidden={!falta}
          >
            Falta {getWhenMissing()}
          </span>
          <div ref={missingLoadingRef} class='h-6 w-16 bg-gray-200 overflow-hidden rounded-full loading'>
            <div />
          </div>
        </div>
        <span class={`${falta ? 'text-gray-500 dark:text-gray-300' : 'text-orange-500 dark:text-orange-600-light'} font-bold text-lg`}>${precio}</span>
      </section>
      <section class='gap-2 h-fit flex flex-col'>
        <div class='items-center justify-start h-fit w-fit flex gap-2'>
          <span class={`${falta ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100'} font-semibold text-lg`}>{origen}</span>
          <Icon class='size-4 rotate-180 text-gray-400 dark:text-gray-200'>
            <IconArrowLeft />
          </Icon>
          <span class={`${falta ? 'text-gray-700 dark:text-gray-300' : 'text-gray-800 dark:text-gray-100'} font-semibold text-lg`}>{destino}</span>
        </div>
        <div class='flex items-center h-fit w-fit gap-2'>
          <Icon class='size-4 text-gray-600 dark:text-gray-300'>
            <IconClock />
          </Icon>
          <span class='text-sm text-gray-600 dark:text-gray-300'>Duración: {parseTimeInMinutes(duracion_en_minutos, 'h-mm')}</span>
        </div>
        <div class='flex items-center h-fit w-fit gap-2'>
          <Icon class='size-4 text-gray-600 dark:text-gray-300'>
            <IconBus />
          </Icon>
          <span class='text-sm text-gray-600 dark:text-gray-300'>Frecuencia: {frecuencia_en_texto}</span>
        </div>
        <div class={`${horario ? '' : 'flex-col items-start'} flex items-center h-fit w-fit gap-2`}>
          <div class='flex items-center w-fit h-fit gap-2'>
            <Icon class='size-4 text-gray-600 dark:text-gray-300'>
              <IconCalendar />
            </Icon>
            <span class='text-sm text-gray-600 dark:text-gray-300'>Horarios:</span>
          </div>
          { horario
            ? <span class='text-gray-600 dark:text-gray-300 text-sm'>{horario}</span>
            : <>
              <div class='flex gap-1 px-5 flex-wrap'>
                { [...horas || []].slice(0, 6).map(({ hora }) => (
                  <span
                    key={`route-card-hora-${hora}`}
                    class='h-fit w-fit rounded-md px-2 p-1 text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/50 text-xs'
                  >
                    {hora}
                  </span>
                )) }
              { (horas && horas.length > 6) && (
                  <button
                    class={`${falta ? 'text-gray-700 hover:bg-gray-100 touch:active:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-500/50 dark:touch:active:bg-gray-500/50' : 'text-orange-500 hover:bg-orange-100 touch:active:bg-orange-100 dark:text-orange-400 dark:hover:text-orange-50 dark:hover:bg-gray-500/50 dark:touch:active:text-orange-50 dark:touch:active:bg-gray-500/50'} text-xs p-1 px-1.5 cursor-pointer rounded-md transition-colors`}
                    onClick={toggleModal}
                  >
                    +{horas.length - 6} más
                  </button>
                )
              }
              </div>
            </>
          }
        </div>
      </section>
      <section class='h-fit min-h-fit flex-1 flex w-full items-end'>
        <a
          href={falta ? undefined : `/buy-ticket/${id}`}
          class={`${falta ? 'bg-gray-700 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 touch:active:bg-orange-600 dark:bg-orange-600/90 dark:hover:bg-orange-600/70 dark:touch:active:bg-orange-600/70 cursor-pointer'} text-sm font-semibold text-nowrap rounded-lg w-full text-center p-3 px-4 text-white transition-colors`}
        >
          { falta
            ? `Falta por ${absence_data?.[0]?.motivo}`
            : 'Comprar pasaje'
          }
        </a>
      </section>
    </article>
  )
}
