import { Icon } from '@/components/Icon'
import { IconArrowLeft } from '@/components/Icons'
import { HeaderInfo } from '@/components/tracking/HeaderInfo'
import { useTrackUIStore } from '@/stores/useTrackUIStore'

export function Header () {
  const isUIVisible = useTrackUIStore((state) => state.isUIVisible)

  return (
    <header
      class='w-full h-16 z-10 relative border-b-gray-200 border-b-[1px] px-8 pl-4 bg-white text-gray-700 top-0 left-0 flex justify-between items-center [&_.icon]:max-h-10 dark:border-0 dark:bg-transparent'
      hidden={!isUIVisible}
    >
      <aside class='flex items-center gap-2'>
        <a
          href='/'
          class='flex text-sm font-semibold cursor-pointer items-center justify-center max-h-full h-fit w-fit p-3 px-4 hover:bg-gray-200 touch:active:bg-gray-200 transition-colors gap-2 rounded-lg bg-white dark:bg-transparent dark:text-gray-200 dark:hover:bg-gray-700 dark:touch:active:bg-gray-700'
        >
          <Icon class='size-5'>
            <IconArrowLeft />
          </Icon>
          <span>Volver</span>
        </a>
        <h1 class='font-bold text-lg not-md:hidden text-nowrap min-w-fit dark:text-gray-50'>Seguimiento a tiempo real</h1>
      </aside>
      <HeaderInfo />
    </header>
  )
}
