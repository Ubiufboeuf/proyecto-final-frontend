import { LoginLink } from './LoginLink'
import { RegisterLink } from './RegisterLink'
import { AccountLink } from './AccountLink'
import { useUserStore } from '@/stores/useUserStore'
import { SignedOut } from './SignedOut'
import { SignedIn } from './SignedIn'

export function UserLinks ({ display = 'header' }: { display: 'header' | 'sidebar' }) {
  const user = useUserStore((state) => state.user)

  return (
    <>
      {
        display === 'header' ? (
          <div class='h-full w-fit not-xl:flex-1 flex items-center justify-end gap-2'>
            <SignedOut>
              <LoginLink class='not-xs:hidden xl:flex lg:hidden' />
              <RegisterLink class='not-xs:hidden xl:flex lg:hidden' />
            </SignedOut>
            <SignedIn>
              <AccountLink username={user?.username} />
            </SignedIn>
          </div>
        ) : (
          <>
            <SignedOut>
              <RegisterLink class='w-full text-center' />
              <LoginLink class='w-full text-center' />
            </SignedOut>
            <SignedIn>
              <AccountLink username={user?.username} class='w-full' />
            </SignedIn>
          </>
        )
      }
    </>
  )
}
