import { LoginLink } from './LoginLink'
import { RegisterLink } from './RegisterLink'
import { AccountLink } from './AccountLink'
import { useUserStore } from '@/stores/useUserStore'

export function UserLinks ({ display = 'header' }: { display: 'header' | 'sidebar' }) {
  const isAuth = useUserStore((state) => state.isAuth)
  
  if (display === 'header') return (
    <div class='h-full w-fit not-xl:flex-1 flex items-center justify-end gap-2'>
      { !isAuth && <>
        <LoginLink class='not-xs:hidden xl:flex lg:hidden' />
        <RegisterLink class='not-xs:hidden xl:flex lg:hidden' />
      </> }
      { isAuth && <AccountLink /> }
    </div>
  )

  if (display === 'sidebar') return (
    <>
      <RegisterLink class='w-full text-center' />
      <LoginLink class='w-full text-center' />
      <AccountLink />
    </>
  )
}
