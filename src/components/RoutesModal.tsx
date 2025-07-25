import { useRoutesModal } from '@/stores/useRoutesModal'
import { useEffect } from 'preact/hooks'

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
      class='h-full w-full fixed left-0 top-0 bg-black/30 flex'
      onClick={hideModal}
      hidden={!isModalOpen}
    >
      
    </dialog>
  )
}
