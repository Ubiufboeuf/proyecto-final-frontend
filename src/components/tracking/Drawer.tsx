import { Drawer } from 'vaul'
import { Icon } from '../Icon'
import { IconWideArrowUp } from '../Icons'
import { Aside } from './Aside'
import type { BusesData } from '@/env'

export default function VaulDrawer ({ busesData }: { busesData: BusesData }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger id='trigger' className='lg:hidden hover:bg-gray-100 touch:active:bg-gray-100 transition-colors cursor-pointer absolute bottom-6 left-1/2 [transform:translateX(-50%)] z-10 bg-white h-fit w-fit px-8 py-1.5 rounded-xl dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:touch:active:bg-gray-800'>
        <Icon class='w-10 h-10'>
          <IconWideArrowUp />
        </Icon>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='lg:hidden fixed max-h-full inset-0 z-[11] bg-black/40' />
        <Drawer.Content className='lg:hidden bg-gray-800 flex flex-col z-[12] max-h-4/5 rounded-t-[10px] mt-24 h-[calc(100%-128px)] fixed bottom-0 left-0 right-0 outline-none'>
          <Drawer.Title className='DialogTitle hidden'>Selecciona los ómnibus para ver en el mapa</Drawer.Title>
          <div className='py-3 bg-white dark:bg-transparent rounded-t-[10px] flex-1 h-full pb-5'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-gray-400 mb-3' />
            <Aside
              class='relative z-[12] lg:hidden flex flex-col justify-between h-full max-h-full w-full overflow-hidden border border-gray-200 bg-white dark:bg-transparent dark:border-0 [transition:left_250ms_ease] [&_#buses-cards-wrapper]:lg:grid-cols-1 [&_#buses-cards-wrapper]:sm:grid-cols-2'
              busesData={busesData}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
