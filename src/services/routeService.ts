import type { Ruta } from '@/env'
import { ENDPOINTS } from '@/lib/constants'

export async function getAllRoutes () {
  // return fetch(`${ENDPOINTS.ROUTES}`)
  return fetch('http://localhost:4321/src/mocks/routes.json') // Por ahora, en lo que hacemos el servidor
    .catch((err) => {
      console.log(err)
      throw new Error('Error consiguiendo las rutas')
    })
    .then((res) => res.json())
    .catch(() => {
      throw new Error('Error consiguiendo las rutas, formato json inválido')
    })
    .then((data) => {
      const routes: Ruta[] = []

      for (const item of data) {
        if (!item.id || !item.precio) continue

        routes.push({
          id: item.id,
          destino: item.destino ?? 'undefined',
          duracion_en_minutos: item.duracion ?? 0,
          frecuencia_en_texto: item.frecuencia ?? 'undefined',
          origen: item.origen ?? 'undefined',
          precio: item.precio ?? 0,
          tipo: item.tipo ?? 'directo',
          falta: item.falta ?? undefined,
          horario: item.horario ?? undefined,
          horas: item.horas ?? undefined
        })
      }

      return routes
    })
}

export async function getRouteById (id: string) {

}
