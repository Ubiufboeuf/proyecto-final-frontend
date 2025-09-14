import { useContactsStore } from '@/stores/useContactsStore'
import { useEffect, useId, useRef, useState, type ChangeEvent } from 'preact/compat'
import { Icon } from './Icon'
import { IconCopy, IconMail, IconPhone, IconX } from './Icons'
import { ButtonCopy } from './ButtonCopy'
import { PhoneContact } from './PhoneContact'

export function ContactsModal () {
  const isModalOpen = useContactsStore((state) => state.isModalOpen)
  const setIsModalOpen = useContactsStore((state) => state.setIsModalOpen)
  const modalRef = useRef<HTMLDialogElement>(null)
  const [offices] = useState([
    { dept: 'Colonia', place: 'Local Nº 401 - Terminal de Ómnibus', number: '4522 5301', maps: 'https://goo.gl/maps/n6dJaecYFAoNUNkw7' },
    { dept: 'Carmelo', place: 'Uruguay 337', number: '4542 2504', maps: 'https://goo.gl/maps/ekq5ueUK5CLCVyQq6' },
    { dept: 'Nueva palmira', place: 'Gral Artigas 1193, esq.Eloy García', number: '4544 6181', maps: 'https://goo.gl/maps/URc34cnf6J6xDNuT6' },
    { dept: 'Dolores', place: 'Artigas esq. Pbro. Bonofacio Redruello', number: '4534 4179', maps: 'https://goo.gl/maps/YmXeak5CnUxg1VFK8' },
    { dept: 'Mercedes', place: 'Local Nº 7 -Terminal Shopping', number: '4532 6449', maps: 'https://goo.gl/maps/FuTGqrJsBcDDrVSY7' },
    { dept: 'Ombúes', place: 'Zorrilla 1036 Bis', number: '4576 2859', maps: 'https://goo.gl/maps/NEh2aDkewo6HxLs69' }
  ])
  const [copied, setCopied] = useState<string | null>(null)
  
  useEffect(() => {
    if (isModalOpen) document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isModalOpen])

  function closeModal (event: ChangeEvent<HTMLDialogElement | HTMLButtonElement>) {
    if (event.currentTarget !== event.target && event.currentTarget.localName !== 'button') return
    setIsModalOpen(false)
  }
  
  return (
    <dialog
      ref={modalRef}
      class='fixed left-0 top-0 w-full h-full flex items-center justify-center bg-black/80'
      onClick={closeModal}
    >
      <section class='h-130 w-224 max-h-full max-w-full bg-white dark:bg-gray-800 rounded-lg text-neutral-700 dark:text-gray-300 [&_.icon]:max-h-10 overflow-y-auto p-6 gap-6 flex flex-col'>
        <header class='h-15 flex items-start justify-between min-h-fit'>
          <div class='px-2'>
            <div class='flex items-center gap-2 pb-1.5'>
              <Icon class='size-6 text-orange-500'>
                <IconPhone />
              </Icon>
              <h1 class='text-2xl font-bold dark:text-gray-50'>Contactos Berrutti</h1>
            </div>
            <p class='text-sm text-gray-500 dark:text-gray-300'>Encuentra el teléfono y dirección de nuestras oficinas en todo el país</p>
          </div>
          <button
            class='h-fit w-fit p-2 hover:bg-gray-200 touch:active:bg-gray-200 dark:hover:bg-gray-700 dark:touch:active:bg-gray-700 rounded-lg cursor-pointer transition'
            title='Cerrar'
            onClick={closeModal}
          >
            <Icon class='size-6 text-gray-800 dark:text-gray-100'>
              <IconX />
            </Icon>
          </button>
        </header>
        <main class='flex flex-col gap-5 h-full min-h-fit w-full'>
          <article class='w-full h-32 p-4 border dark:border-0 rounded-lg border-gray-300 dark:bg-gray-700/50 flex flex-col justify-center gap-2 px-6'>
            <div class='flex items-center gap-2'>
              <Icon class='size-5 text-orange-500 dark:text-orange-600-light'>
                <IconMail />
              </Icon>
              <span class='text-lg font-semibold line-clamp-1 max-w-full text-orange-500 dark:text-orange-600-light'>Email Principal</span>
            </div>
            <div class='flex items-center justify-between flex-wrap gap-2'>
              <span class='line-clamp-1 text-ellipsis dark:text-gray-200'>berruttiturismo@adinet.com.uy</span>
              <ButtonCopy id='mail' setCopied={setCopied} copy='berruttiturismo@adinet.com.uy'>
                <Icon class='size-4'>
                  <IconCopy />
                </Icon>
                { copied ? '¡Copiado!' : 'Copiar' }
              </ButtonCopy>
            </div>
          </article>
          <h2 class='text-lg font-semibold text-gray-800 dark:text-gray-100'>Nuestras Oficinas</h2>
          <div class='grid md:grid-cols-2 gap-4'>
            {
              offices.map((contact) => (
                <PhoneContact key={useId()} contact={contact} />
              ))
            }
          </div>
        </main>
        <footer class='flex gap-1 w-full h-30 min-h-fit p-2 flex-col border border-blue-200 bg-blue-50 rounded-lg text-blue-700 items-center justify-center text-center dark:bg-gray-700/50 dark:border-0 dark:text-gray-300'>
          <h1 class='font-semibold mb-1 dark:text-gray-100'>Horarios de Atención</h1>
          <p class='text-sm text-center'>Lunes a Viernes: 7:00 - 19:00 | Sábados: 8:00 - 12:00</p>
          <p class='text-xs text-center'>Los horarios pueden variar según la oficina</p>
        </footer>
      </section>
    </dialog>
  )
}
