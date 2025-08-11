import { Icon } from '@/components/Icon'
import { IconPhone } from '@/components/Icons'
import { useContactsStore } from '@/stores/useContactsStore'
import { createPortal } from 'preact/compat'
import { ContactsModal } from './ContactsModal'

export function ContactViaPhone () {
  const isModalOpen = useContactsStore((state) => state.isModalOpen)
  const setIsModalOpen = useContactsStore((state) => state.setIsModalOpen)

  function showPhoneContacts () {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {isModalOpen && createPortal(
        <ContactsModal />,
        document.body
      )}
      <button
        class='flex items-center justify-center w-fit h-fit gap-2 cursor-pointer hover:text-gray-700 touch:active:text-gray-700 hover:bg-white touch:active:bg-white rounded-lg transition-colors px-4 py-2'
        onClick={showPhoneContacts}
      >
        <Icon class='size-4'>
          <IconPhone />
        </Icon>
        <span>Ver Contactos</span>
      </button>
    </>
  )
}
