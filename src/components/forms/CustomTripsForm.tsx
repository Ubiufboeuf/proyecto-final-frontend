import { Icon } from '@/components/Icon'
import { IconBus, IconCalendar, IconMapPin, IconShield } from '@/components/Icons'
import { TypesOfBuses } from '@/components/custom-trips/TypesOfBuses'
import { TripTypes } from '@/components/custom-trips/TripTypes'
import { TripDetails } from '@/components/custom-trips/TripDetails'
import { TripInfo } from '@/components/custom-trips/TripInfo'
import { TripSummary } from '@/components/custom-trips/TripSummary'

export function CustomTripsForm () {
  function handleSubmitForm (event: SubmitEvent) {
    // event.preventDefault()
  }
  
  return (
    <form
      class='flex gap-8 h-fit w-full py-4 lg:flex-row flex-col'
      onSubmit={handleSubmitForm}
    >
      <div class='gap-8 flex flex-col items-center w-full h-fit'>
        <section class='relative h-fit w-full flex flex-col p-6 gap-6 rounded-lg border border-gray-300 dark:border-0 bg-white dark:bg-gray-700/50'>
          <header class='flex items-center gap-3 w-fit h-fit text-orange-500 dark:text-orange-600-light'>
            <Icon class='size-6'>
              <IconMapPin />
            </Icon>
            <h1 class='text-2xl font-bold text-gray-800 dark:text-gray-100'>Tipo de Viaje</h1>
          </header>
          <TripTypes />
        </section>
        <section class='relative h-fit w-full flex flex-col p-6 gap-6 rounded-lg border border-gray-300 dark:border-0 bg-white dark:bg-gray-700/50'>
          <header class='flex items-center gap-3 w-fit h-fit text-orange-500 dark:text-orange-600-light'>
            <Icon class='size-6'>
              <IconBus />
            </Icon>
            <h1 class='text-2xl font-bold text-gray-800 dark:text-gray-100'>Selecciona tu Ómnibus</h1>
          </header>
          <TypesOfBuses />
        </section>
        <section class='h-fit w-full flex flex-col p-6 gap-6 rounded-lg border border-gray-300 dark:border-0 bg-white dark:bg-gray-700/50'>
          <header class='flex items-center gap-3 w-fit h-fit text-orange-500 dark:text-orange-600-light'>
            <Icon class='size-6'>
              <IconCalendar />
            </Icon>
            <h1 class='text-2xl font-bold text-gray-800 dark:text-gray-100'>Detalles del Viaje</h1>
          </header>
          <TripDetails />
        </section>
        <section class='h-fit w-full flex flex-col p-6 gap-6 rounded-lg border border-gray-300 dark:border-0 bg-white dark:bg-gray-700/50'>
          <header class='flex items-center gap-3 w-fit h-fit text-orange-500 dark:text-orange-600-light'>
            <h1 class='text-2xl font-bold text-gray-800 dark:text-gray-100'>Información Adicional</h1>
          </header>
          <TripInfo />
        </section>
      </div>
      <div class='sticky top-6 flex flex-col w-full h-[inherit] flex-1 min-w-[max(18rem,30vw)]'>
        <section class='h-fit w-full flex flex-col p-6 gap-6 rounded-lg border border-gray-300 dark:border-0 bg-white dark:bg-gray-700/50'>
          <header class='flex gap-3 w-full h-fit items-center text-orange-500 dark:text-orange-600-light border-b border-gray-300 pb-4'>
            <Icon class='size-6'>
              <IconShield />
            </Icon>
            <h1 class='text-2xl font-bold text-gray-800 dark:text-gray-100'>Resumen de Viaje</h1>
          </header>
          <TripSummary />
        </section>
      </div>
    </form>
  )
}
