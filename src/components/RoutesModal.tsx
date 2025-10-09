import { useRoutesModal } from '@/stores/useRoutesModal'
import type { TargetedEvent } from 'preact/compat'
import { Icon } from './Icon'
import { IconArrowLeft, IconBus, IconX } from './Icons'
import { parseTimeInMinutes } from '@/lib/utils'

export function RoutesModal () {
  const isModalOpen = useRoutesModal((state) => state.isModalOpen)
  const modalInfo = useRoutesModal((state) => state.modalInfo)
  const setIsModalOpen = useRoutesModal((state) => state.setIsModalOpen)

  function hideModal () {
    setIsModalOpen(false)
  }

  function handleHideModal (event: TargetedEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    hideModal()
  }

  if (!modalInfo) return

  const { id, precio, origen, destino, duracion_en_minutos, horas } = modalInfo
  
  return (
    <dialog
      // ref={modalRef}
      class='h-screen w-screen min-h-fit fixed left-0 top-0 bg-black/80 flex items-center justify-center z-20'
      onClick={handleHideModal}
      hidden={!isModalOpen}
    >
      <main class='w-168 overflow-y-auto h-full max-h-fit min-h-[max(fit-content,460px)] bg-white dark:bg-gray-800 rounded-lg text-neutral-700 dark:text-gray-300 p-5 px-7 gap-2 flex flex-col'>
        <section class='h-fit flex flex-wrap-reverse items-center justify-between min-h-fit'>
          <div class='flex items-center gap-2'>
            <Icon class='size-5 xs:size-6 text-orange-500'>
              <IconBus />
            </Icon>
            <h1 class='text-lg font-bold text-gray-800 dark:text-gray-50 hidden xs:flex items-center'>
              Horarios
              <div class='flex items-center gap-1'>
                <span>: {origen}</span>
                <Icon class='rotate-180 text-gray-500 size-5'>
                  <IconArrowLeft />
                </Icon>
                <span>{destino}</span>
              </div>
            </h1>
            <h1 class='flex xs:hidden items-center gap-1 text-md font-semibold text-gray-800 dark:text-gray-50'>
              <span>{origen}</span>
              <Icon class='rotate-180 text-gray-500 size-4'>
                <IconArrowLeft />
              </Icon>
              <span>{destino}</span>
            </h1>
          </div>
          <button
            class='h-fit w-fit p-2 hover:bg-gray-200 touch:active:bg-gray-200 dark:hover:bg-gray-700 dark:touch:active:bg-gray-700 rounded-lg cursor-pointer transition-colors ml-auto'
            title='Cerrar'
            onClick={hideModal}
          >
            <Icon class='size-6 text-gray-800 dark:text-gray-100'>
              <IconX />
            </Icon>
          </button>
        </section>
        <section class='w-full h-fit flex flex-col gap-4'>
          <div class='flex flex-col gap-2'>
            <div class='flex items-center gap-2'>
              <div class='rounded-full bg-blue-500 dark:bg-blue-500/70 size-3' />
              <h1 class='text-blue-600 dark:text-blue-500 font-semibold'>
                Mañana (6:00 - 11:59)
              </h1>
            </div>
            <div class='flex gap-2 flex-wrap'>
              { horas?.map(({ hora, momento }) => momento === 'mañana' && (
                <span
                  key={`modal-hora-${id}-${hora}`}
                  class='h-fit w-fit px-3 p-1 rounded-full bg-blue-100 text-sm font-medium text-blue-700 dark:bg-gray-700/50 dark:text-blue-300'
                >
                  {hora}
                </span>
              )) }
            </div>
          </div>
          <div class='flex flex-col gap-2'>
            <div class='flex items-center gap-2'>
              <div class='rounded-full bg-green-500 dark:bg-green-500/70 size-3' />
              <h1 class='text-green-700 dark:text-green-500/70 font-semibold'>
                Tarde (12:00 - 17:59)
              </h1>
            </div>
            <div class='flex gap-2 flex-wrap'>
              { horas?.map(({ hora, momento }) => momento === 'tarde' && (
                <span
                  key={`modal-hora-${id}-${hora}`}
                  class='h-fit w-fit px-3 p-1 rounded-full bg-green-100 text-sm font-medium text-green-700 dark:bg-gray-700/50 dark:text-green-400/80'
                >
                  {hora}
                </span>
              )) }
            </div>
          </div>
          <div class='flex flex-col gap-2'>
            <div class='flex items-center gap-2'>
              <div class='rounded-full bg-purple-500 dark:bg-purple-500/70 size-3' />
              <h1 class='text-purple-600 dark:text-purple-500/70 font-semibold'>
                Noche (18:00 - 5:59)
              </h1>
            </div>
            <div class='flex gap-2 flex-wrap'>
              { horas?.map(({ hora, momento }) => momento === 'noche' && (
                <span
                  key={`modal-hora-${id}-${hora}`}
                  class='h-fit w-fit px-3 p-1 rounded-full bg-purple-100 text-sm font-medium text-purple-700 dark:bg-gray-700/50 dark:text-purple-400/80'
                >
                  {hora}
                </span>
              )) }
            </div>
          </div>
        </section>
        <section class='w-full h-fit p-4 py-6 flex flex-col gap-1'>
          <div class='text-sm text-gray-600 dark:text-gray-300 flex items-center w-full h-fit justify-between'>
            Total de servicios diarios:
            <span class='text-sm font-semibold text-gray-800'>{horas?.length ?? 0}</span>
          </div>
          <div class='text-sm text-gray-600 dark:text-gray-300 flex items-center w-full h-fit justify-between'>
            Duración del viaje:
            <span class='text-sm font-medium text-gray-800'>{parseTimeInMinutes(duracion_en_minutos, 'h-mm')}</span>
          </div>
          <div class='text-sm text-gray-600 dark:text-gray-300 flex items-center w-full h-fit justify-between'>
            Precio:
            <span class='text-sm font-semibold text-orange-600 dark:text-orange-500'>${precio}</span>
          </div>
        </section>
        <section class='w-full flex items-end justify-center'>
          <p class='text-center text-sm text-gray-600 dark:text-gray-300'>Los horarios pueden variar según la temporada. Confirma al comprar tu pasaje.</p>
        </section>
      </main>
    </dialog>
  )
}
