import { useContactsStore } from '@/stores/useContactsStore'
import { useEffect, useRef, type ChangeEvent } from 'preact/compat'

export function ContactsModal () {
  const isModalOpen = useContactsStore((state) => state.isModalOpen)
  const setIsModalOpen = useContactsStore((state) => state.setIsModalOpen)
  const modalRef = useRef<HTMLDialogElement>(null)

  function closeModal (event: ChangeEvent<HTMLDialogElement>) {
    if (event.currentTarget !== event.target) return
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (!modalRef.current || isModalOpen) return
    modalRef.current.hidden = true
  }, [isModalOpen])
  
  return (
    <dialog
      ref={modalRef}
      class='fixed left-0 top-0 w-full h-full flex items-center justify-center bg-[#4444]'
      onClick={closeModal}
    >
      <main class='h-80 w-160 bg-red-700'>
        main
      </main>
    </dialog>
  )
}
