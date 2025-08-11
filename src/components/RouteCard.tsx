import type { Ruta } from '@/env'
import { Icon } from '@/components/Icon'
import { IconArrowLeft, IconBus, IconClock, IconCalendar } from '@/components/Icons'
import { parseTimeInMinutes } from '@/lib/utils'
import { useRoutesModal } from '@/stores/useRoutesModal'

export function RouteCard (ruta: Ruta) {
  const { id, tipo, precio, origen, destino, duracion_en_minutos, horas, horario, falta, frecuencia_en_texto } = ruta
  
  const isModalOpen = useRoutesModal((state) => state.isModalOpen)
  const setIsModalOpen = useRoutesModal((state) => state.setIsModalOpen)
  const setModalInfo = useRoutesModal((state) => state.setModalInfo)

  function toggleModal () {
    setIsModalOpen(!isModalOpen)
    setModalInfo(ruta)
  }

  return (
    <article class={`${falta ? 'bg-gray-200' : 'bg-white'} h-full w-full overflow-hidden flex flex-col justify-between rounded-lg boder border border-gray-300 py-6 px-6 gap-4`}>
      <section class='h-fit w-full flex justify-between items-center'>
        <div class='flex h-fit w-fit flex-wrap gap-1 items-center'>
          <span
            class={`${falta
              ? 'text-gray-700 bg-gray-100'
              : tipo === 'internacional'
                ? 'text-blue-700 bg-blue-100'
                : 'text-amber-700 bg-orange-100'
              }
              h-fit overflow-hidden w-fit text-xs first-letter:uppercase p-1 px-3 rounded-full font-semibold
            `}
          >
            {tipo}
          </span>
          <span
            class={`${falta
              ? 'text-gray-700 bg-gray-100'
              : 'text-yellow-700 bg-yellow-100'
              }
              h-fit overflow-hidden w-fit text-xs first-letter:uppercase p-1 px-3 rounded-full font-semibold
            `}
          >
            Falta en 2 días
          </span>
        </div>
        <span class={`${falta ? 'text-gray-500' : 'text-orange-500'} font-bold text-lg`}>${precio}</span>
      </section>
      <section class='gap-2 h-fit flex flex-col'>
        <div class='items-center justify-start h-fit w-fit flex gap-2'>
          <span class={`${falta ? 'text-gray-700' : 'text-gray-800'} font-semibold text-lg mb-1`}>{origen}</span>
          <Icon class='size-4 rotate-180 text-gray-400'>
            <IconArrowLeft />
          </Icon>
          <span class={`${falta ? 'text-gray-700' : 'text-gray-800'} font-semibold text-lg`}>{destino}</span>
        </div>
        <div class='flex items-center h-fit w-fit gap-2'>
          <Icon class='size-4 text-gray-600'>
            <IconClock />
          </Icon>
          <span class='text-sm text-gray-600'>Duración: {parseTimeInMinutes(duracion_en_minutos, 'h-mm')}</span>
        </div>
        <div class='flex items-center h-fit w-fit gap-2'>
          <Icon class='size-4 text-gray-600'>
            <IconBus />
          </Icon>
          <span class='text-sm text-gray-600'>Frecuencia: {frecuencia_en_texto}</span>
        </div>
        <div class={`${horario ? '' : 'flex-col items-start'} flex items-center h-fit w-fit gap-2`}>
          <div class='flex items-center w-fit h-fit gap-2'>
            <Icon class='size-4 text-gray-600'>
              <IconCalendar />
            </Icon>
            <span class='text-sm text-gray-600'>Horarios:</span>
          </div>
          { horario
            ? <span class='text-gray-600 text-sm'>{horario}</span>
            : <>
              <div class='flex gap-1 px-5 flex-wrap'>
                { [...horas || []].slice(0, 6).map(({ hora }) => (
                  <span
                    key={`route-card-hora-${hora}`}
                    class='h-fit w-fit rounded-md px-2 p-1 text-gray-600 bg-gray-100 text-xs'
                  >
                    {hora}
                  </span>
                )) }
              { (horas && horas.length > 6) && (
                  <button
                    class={`${falta ? 'text-gray-700' : 'text-orange-500 hover:bg-orange-100'} text-xs p-1 px-1.5 cursor-pointer rounded-md transition-colors`}
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
          class={`${falta ? 'bg-gray-700 cursor-not-allowed' : 'hover:bg-orange-600 bg-orange-500 cursor-pointer'} text-sm font-semibold text-nowrap rounded-lg w-full text-center p-3 px-4 text-white transition-colors`}
        >
          { falta
            ? `Falta por ${falta}`
            : 'Comprar pasaje'
          }
        </a>
      </section>
    </article>
  )
}
