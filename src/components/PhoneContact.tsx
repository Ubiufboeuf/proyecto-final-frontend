import type { Contact } from '@/env'
import { Icon } from './Icon'
import { IconCopy, IconLocation, IconPhone } from './Icons'
import { ButtonCopy } from './ButtonCopy'
import { useState } from 'preact/hooks'

export function PhoneContact ({ contact: { dept, maps, number, place } }: { contact: Contact }) {
  const [copied, setCopied] = useState<string | null>(null)
  
  return (
    <article class='w-full h-55 border-gray-200 border rounded-lg p-6 flex flex-col gap-3 transition-shadow hover:shadow-lg'>
      <strong class='text-orange-600 text-lg font-semibold'>{dept}</strong>
      <div class='flex items-center text-gray-500 gap-2 text-sm'>
        <Icon class='size-4'>
          <IconLocation />
        </Icon>
        {place}
      </div>
      <div class='flex flex-wrap items-center justify-between gap-2'>
        <div class='flex items-center text-gray-500 gap-2 text-sm'>
          <Icon class='size-4'>
            <IconPhone />
          </Icon>
          <strong class='text-gray-700'>{number}</strong>
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
        class='w-full h-8 min-h-fit px-2 py-1 flex items-center justify-center gap-4 border border-blue-400 text-blue-700 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg'
      >
        <Icon class='size-4'>
          <IconLocation />
        </Icon>
        Ver en Google Maps
      </a>
    </article>
  )
}
