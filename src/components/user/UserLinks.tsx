import { LoginButton } from '../LoginButton'
import { RegisterButton } from '../RegisterButton'
import { AccountLink } from './AccountLink'

export function UserLinks ({ display = 'horizontal' }: { display: 'horizontal' | 'vertical' }) {
  return (
    <>
      <LoginButton class='not-xs:hidden xl:flex lg:hidden' />
      <RegisterButton class='not-xs:hidden xl:flex lg:hidden' />
      <AccountLink />
    </>
  )
}
