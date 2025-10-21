import { LoginLink } from './LoginLink'
import { RegisterLink } from './RegisterLink'
import { AccountLink } from './AccountLink'
import { SignedOut } from './SignedOut'
import { SignedIn } from './SignedIn'

export function UserLinks ({ display = 'header' }: { display: 'header' | 'sidebar' }) {
  /** --- Aviso ---
   * No hay que eliminar este componente por si llega a dar fallos el manejo de la sesión del usuario.
   * Ya dió problemas cuando se manejaba con preact por temas de hidratación,
   * y si bien ahora no debería pasar, sólo por si acaso deberíamos dejarlo.
   * 
   * Lo mismo con los componentes <SignedOut> y <SignedIn>
   */
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
              <AccountLink />
            </SignedIn>
          </div>
        ) : (
          <>
            <SignedOut>
              <RegisterLink class='w-full text-center' />
              <LoginLink class='w-full text-center' />
            </SignedOut>
            <SignedIn>
              <AccountLink class='w-full' />
            </SignedIn>
          </>
        )
      }
    </>
  )
}
