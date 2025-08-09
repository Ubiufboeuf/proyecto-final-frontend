import { useState, useEffect, useMemo } from 'preact/compat'
import type { CustomCoords, Options } from '@/env'

const DEFAULT_OPTIONS: Options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
  sendCoordinates: true
}

export default function useLiveGeolocationSender (url: string, options: Options) {
  const [coordinates, setCoordinates] = useState<CustomCoords | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isWatching, setIsWatching] = useState<boolean>(false)
  const [watchId, setWatchId] = useState<number | null>(null)

  // Memoizamos finalOptions para evitar recrear objeto y efectos innecesarios
  const finalOptions = useMemo(() => ({
    ...DEFAULT_OPTIONS,
    ...options
  }), [options.enableHighAccuracy, options.timeout, options.maximumAge, options.sendCoordinates])

  // Función para enviar coordenadas al servidor
  async function sendCoordinatesToServer (coords: CustomCoords) {
    try {
      setLoading(true)
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coords)
      })
      if (!res.ok) {
        throw new Error('Error al enviar coordenadas al servidor.')
      }
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        setError('Ocurrió un error inesperado.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Iniciar seguimiento (simplemente cambia isWatching a true)
  function startWatching () {
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada por tu navegador.')
      return
    }
    if (isWatching) return
    setError(null)
    setLoading(true)
    setIsWatching(true)
  }

  // Detener seguimiento
  function stopWatching () {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setIsWatching(false)
    setLoading(false)
  }

  // Efecto que maneja el watchPosition y reinicia al cambiar opciones o isWatching
  useEffect(() => {
    if (!isWatching) return

    const successHandler = async (position: GeolocationPosition) => {
      const {
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
      } = position.coords

      const newCoordinates: CustomCoords = {
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp: position.timestamp
      }

      setCoordinates(newCoordinates)

      if (finalOptions.sendCoordinates) {
        await sendCoordinatesToServer(newCoordinates)
      } else {
        setLoading(false)
      }
    }

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message)
      setLoading(false)
      setIsWatching(false)
      console.error('Error obteniendo la ubicación:', err)
    }

    const id = navigator.geolocation.watchPosition(successHandler, errorHandler, finalOptions)
    setWatchId(id)

    return () => {
      navigator.geolocation.clearWatch(id)
      setWatchId(null)
    }
  }, [isWatching, finalOptions])

  // Cleanup cuando se desmonta el hook o componente
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  return { coordinates, loading, error, isWatching, startWatching, stopWatching }
}
