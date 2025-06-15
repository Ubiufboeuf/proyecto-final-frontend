import type { Route } from './+types/home'
import { title } from '~/lib/utils'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: title('Inicio') },
    { name: 'description', content: 'Web no oficial de berruti. Proyecto de secundaria' }
  ]
}

export default function Home () {
  return (
    <main>
      Inicio
    </main>
  )
}
