import { useState, useEffect, useRef, useCallback } from 'preact/hooks' // Asegúrate de importar useCallback
import { ENDPOINTS } from '@/lib/constants' 

// URL del servidor HTTP
const SERVER_URL = ENDPOINTS.HTTP_RECORDER 

export function SimpleHttpRouteRecorder () {
  // #region --- Estados y Referencias ---
  const [routeId, setRouteId] = useState('Ruta-A') // Estado para el nombre de la ruta
  const [position, setPosition] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const trackIdRef = useRef<number | null>(null)
  const positionCountRef = useRef(0) // Contador simple
  // #endregion

  // Función para manejar el cambio en el input
  const handleRouteIdChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    // Solo permitimos cambiar el ID si no se está grabando
    if (!isRecording) {
      setRouteId(target.value.trim()) 
    }
  }

  // #region --- Lógica de Envío HTTP (Usando useCallback para estabilidad) ---

  const sendPositionToServer = useCallback(async (pos: GeolocationPosition, currentRouteId: string) => {
    if (!currentRouteId) {
      setError('El ID de la ruta no puede estar vacío.')
      return
    }

    // 1. Construir el payload con el ID dinámico
    const payload = [{ 
      uuid: crypto.randomUUID(),
      routeId: currentRouteId, // <-- ¡Usamos el estado actual!
      count: positionCountRef.current++,
      timestamp: pos.timestamp,
      coords: {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude,
        altitudeAccuracy: pos.coords.altitudeAccuracy,
        heading: pos.coords.heading,
        speed: pos.coords.speed
      }
    }]

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify({ positions: payload })
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`)
      }

      console.log(`[HTTP OK] Posición ${payload[0].count} enviada a ${currentRouteId}.`)
    } catch (err) {
      setError(`[FALLO RED] Falló el envío: ${err.message}`)
    }
  }, [SERVER_URL]) // Dependencia del useCallback

  // #endregion

  // #region --- Lógica de Geolocalización ---

  const successCallback = (pos: GeolocationPosition) => {
    setPosition(pos)
    setError(null)
    
    // 🚨 ACCIÓN CLAVE: Enviar inmediatamente la posición con el ID actual
    // Usamos el valor de 'routeId' del estado para el envío
    void sendPositionToServer(pos, routeId) 
  }

  const errorCallback = (posError: GeolocationPositionError) => {
    // ... (Mismo manejo de error)
    const { code, message } = posError
    let cause = `Error (${code}): ${message}`
    if (code === posError.PERMISSION_DENIED) cause = 'Permiso de ubicación denegado.'
    
    stopWatching() 
    setError(`Error de GPS: ${cause}`)
  }

  const startWatching = () => {
    if (isRecording || !routeId) return // Bloquear si no hay ID
    
    positionCountRef.current = 0 
    setError(null)
    
    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000 
    })

    trackIdRef.current = watchId
    setIsRecording(true)
    console.log(`Iniciando grabación de ruta ${routeId}...`)
  }

  const stopWatching = () => {
    if (trackIdRef.current !== null) {
      navigator.geolocation.clearWatch(trackIdRef.current)
      trackIdRef.current = null
    }
    setIsRecording(false)
    console.log(`Grabación de ruta ${routeId} detenida.`)
  }

  // #endregion

  // Effect de Limpieza
  useEffect(() => {
    return () => {
      stopWatching() 
    }
  }, [])

  return (
    <div style={{ padding: '20px', border: '1px solid #1a1a1a', background: '#202020', color: '#f0f0f0', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Grabadora Simple HTTP 🚌</h2>
      <p>Servidor: <code>{SERVER_URL}</code></p>
      
      <hr style={{ borderColor: '#444' }}/>
      
      <label htmlFor='routeIdInput'>Nombre de la Ruta (ID del JSON):</label>
      <input
        id='routeIdInput'
        type='text'
        value={routeId}
        onInput={handleRouteIdChange}
        disabled={isRecording}
        placeholder='Ej: Ruta-Norte'
        style={{ 
          marginTop: '5px', 
          marginBottom: '15px', 
          width: '100%', 
          padding: '8px',
          backgroundColor: isRecording ? '#333' : '#fff',
          color: isRecording ? '#ccc' : '#000',
          border: '1px solid #555'
        }}
      />

      <p>Estado: 
        <strong style={{ color: isRecording ? '#4CAF50' : '#f44336' }}>
          {isRecording ? ` GRABANDO: ${routeId}` : ' DETENIDO'}
        </strong>
      </p>
      <p>Total Enviado: {positionCountRef.current}</p>
      <p>Latitud: {position?.coords?.latitude?.toFixed(6) ?? 'N/A'}</p>
      <p>Longitud: {position?.coords?.longitude?.toFixed(6) ?? 'N/A'}</p>
      
      <hr style={{ borderColor: '#444' }}/>
      
      <button 
        onClick={isRecording ? stopWatching : startWatching} 
        disabled={!routeId} // Deshabilitar si el campo de ruta está vacío
        style={{ 
          padding: '10px 20px', 
          cursor: routeId ? 'pointer' : 'not-allowed', 
          backgroundColor: isRecording ? '#ff9800' : '#4CAF50', 
          color: 'white', 
          border: 'none' 
        }}
      >
        {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
      </button>

      {error && <p style={{ color: '#f44336', marginTop: '10px', fontWeight: 'bold' }}>Error: {error}</p>}
    </div>
  )
}
