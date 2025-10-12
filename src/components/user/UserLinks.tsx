import { LoginLink } from './LoginLink'
import { RegisterLink } from './RegisterLink'
import { AccountLink } from './AccountLink'

export function UserLinks ({ display = 'horizontal' }: { display: 'horizontal' | 'vertical' }) {
  return (
    <>
      <LoginLink class='not-xs:hidden xl:flex lg:hidden' />
      <RegisterLink class='not-xs:hidden xl:flex lg:hidden' />
      <AccountLink />
    </>
  )
}
