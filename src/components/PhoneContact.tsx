import type { Contact } from '@/env'
import { Icon } from './Icon'
import { IconCopy, IconMapPin, IconPhone } from './Icons'
import { ButtonCopy } from './ButtonCopy'
import { useState } from 'preact/hooks'

export function PhoneContact ({ contact: { dept, maps, number, place } }: { contact: Contact }) {
  const [copied, setCopied] = useState<string | null>(null)
  
  return (
    <article class='w-full h-52 min-h-fit border-gray-300 border dark:border-0 dark:bg-gray-700/50 rounded-lg p-6 flex flex-col justify-between gap-3 transition-shadow'>
      <strong class='text-orange-600 dark:text-orange-600-light text-lg font-semibold'>{dept}</strong>
      <div class='flex items-center text-gray-500 dark:text-gray-300 gap-2 text-sm'>
        <Icon class='size-4'>
          <IconMapPin />
        </Icon>
        {place}
      </div>
      <div class='flex flex-wrap items-center justify-between gap-2'>
        <div class='flex items-center text-gray-500 dark:text-gray-300 gap-2 text-sm'>
          <Icon class='size-4'>
            <IconPhone />
          </Icon>
          <strong class='text-gray-700 dark:text-gray-200'>{number}</strong>
        </div>
        <ButtonCopy id={number} copy={number} setCopied={setCopied}>
          <Icon class='size-4'>
            <IconCopy />
          </Icon>
          { copied ? '¡Copiado!' : 'Copiar' }
        </ButtonCopy>
      </div>
      <a
        href={maps}
        target='_blank'
        rel='noreferrer noopener'
        class='w-full h-8 min-h-fit px-2 py-1 flex items-center justify-center gap-4 border border-blue-400 text-blue-700 text-sm bg-blue-50 hover:bg-blue-100 touch:active:bg-blue-100 dark:bg-blue-700/50 dark:text-blue-50 dark:border-0 dark:hover:bg-blue-700/80 dark:touch:active:bg-blue-700/80 rounded-lg transition-colors'
      >
        <Icon class='size-4'>
          <IconMapPin />
        </Icon>
        Ver en Google Maps
      </a>
    </article>
  )
}
