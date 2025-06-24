import { useCallback, useEffect, useState } from 'preact/compat'

type Options = {
  enableHighAccuracy?: boolean
  timeout?: number // Tiempo máximo para obtener la posición (en ms)
  maximumAge?: number // No usar posiciones cacheadas
  sendCoordinates?: boolean
}

type CustomCoords = {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
  timestamp: number
}

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

  const finalOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  }

  
  // se usa useCallback para evitar re-renderizados indeseados por el useEffect o cargas de más de la función
  const sendCoordinatesToServer = useCallback(async (coords: CustomCoords) => {
    try {
      // setLoading(true)
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
      // Intentando un buen manejo de errores :P
      if (err instanceof Error) {
        setError(err.message)
      } else if (typeof err === 'string') {
        setError(err)
      } else {
        console.error('Surgió un error inesperado al enviar las coordenadas al servidor.')
        setError('Ocurrió un error inesperado.')
      }
    } finally {
      // setLoading(false)
    }
  }, [url])
  
  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setError('La geolocalización no está soportada por tu navegador.')
      return
    }

    if (isWatching) return // Evitar iniciar si ya está observando

    setError(null)
    setLoading(true)

    async function successHandler (position: GeolocationPosition) {
      const { accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed } = position.coords
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
        setLoading(true)
        await sendCoordinatesToServer(newCoordinates)
        setLoading(false)
      } else {
        setLoading(false)
      }

      // No se puede usar el mismo setLoading porque el primero espera, el segundo no
    }

    function errorHandler (err: GeolocationPositionError) {
      setError(err.message)
      setLoading(false)
      setIsWatching(false)
      console.error('Error obteniendo la ubicación:', err)
    }

    const newWatchId = navigator.geolocation.watchPosition(successHandler, errorHandler, finalOptions)
    setWatchId(newWatchId)
    setIsWatching(true)
  }, [isWatching, finalOptions])

  function stopWatching () {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }

    setIsWatching(false)
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      stopWatching()
    }
  }, [])
  
  return { coordinates, loading, error, isWatching, startWatching, stopWatching }
}
