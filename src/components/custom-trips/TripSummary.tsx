import { Icon } from '../Icon'
import { IconSend } from '../Icons'

export function TripSummary () {
  return (
    <div class='w-full h-fit flex flex-col gap-4'>
      <section class='
        rounded-lg p-4 px-5 flex text-sm flex-col gap-2 bg-orange-50 text-orange-700 dark:bg-gray-700/70 dark:text-gray-300
        [&_span]:flex [&_span]:items-center [&_span]:justify-center [&_span]:min-w-6 [&_span]:size-6 [&_span]:text-xs [&_span]:font-semibold [&_span]:rounded-full [&_span]:bg-orange-200 dark:[&_span]:bg-gray-800/50
      '>
        <h1 class='font-semibold mb-2 text-base text-orange-800 dark:text-gray-200'>¿Cómo funciona?</h1>
        <div class='flex items-start gap-2'>
          <span>1</span>
          <p>Completa tu solicitud con todos los detalles</p>
        </div>
        <div class='flex items-start gap-2'>
          <span>2</span>
          <p>Recibe tu cotización personalizada en menos de 2 horas</p>
        </div>
        <div class='flex items-start gap-2'>
          <span>3</span>
          <p>Confirma y disfruta tu viaje personalizado</p>
        </div>
      </section>
      <button class='flex items-center justify-center gap-2 text-nowrap rounded-lg p-3 px-4 text-sm font-semibold hover:bg-orange-600 touch:active:bg-orange-600 bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-600/80 dark:touch:active:bg-orange-600/80 text-white transition-colors cursor-pointer'>
        <Icon class='size-5'>
          <IconSend />
        </Icon>
        Solicitar Cotización
      </button>
    </div>
  )
}
