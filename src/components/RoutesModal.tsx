import { useRoutesModal } from '@/stores/useRoutesModal'
import { useEffect } from 'preact/hooks'

export function RoutesModal () {
  const isModalOpen = useRoutesModal((state) => state.isModalOpen)
  const setIsModalOpen = useRoutesModal((state) => state.setIsModalOpen)

  function hideModal () {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.scrollbarGutter = 'stable'
    } else {
      document.documentElement.style.overflow = 'auto'
      document.documentElement.style.scrollbarGutter = 'stable'
    }
  }, [isModalOpen])

  return (
    <dialog
      class='h-full w-full fixed left-0 top-0 bg-black/30 flex'
      onClick={hideModal}
      hidden={!isModalOpen}
    >
      
    </dialog>
  )
}
