import { useBusesStore } from '@/stores/useBusesStore'

export function HeaderInfo () {
  const selectedCount = useBusesStore((state) => state.selectedCount)
  const count = useBusesStore((state) => state.count)

  return (
    <section class='flex items-center justify-center w-fit h-fit gap-3'>
      <div class={`
        ${count ? 'hasBuses' : ''} [&.hasBuses]:text-blue-700 [&.hasBuses]:bg-blue-100 [&.hasBuses]:border-blue-300 text-gray-700 bg-gray-100 border-gray-300 dark:[&.hasBuses]:bg-transparent dark:[&.hasBuses]:text-blue-400 dark:[&.hasBuses]:border-blue-400 
         rounded-lg text-xs p-2 px-4 font-semibold border w-fit h-10 content-center text-nowrap text-center`}>
        { selectedCount }
        <span class='not-sm:hidden'> ómnibus</span>
        <span class='not-xxs:hidden'>{ selectedCount === 1 ? ' seleccionado' : ' seleccionados' }</span>
        <span class='xxs:hidden'>/{count}</span>
      </div>
    </section>
  )
}
