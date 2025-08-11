import { useState, useEffect } from 'preact/compat'
import useLiveGeolocationSender from '@/hooks/useLiveGeolocationSender'

const connectionColors = {
  connected: 'bg-green-500',
  connecting: 'bg-yellow-500',
  disconnected: 'bg-red-500'
}

const connectionsTexts = {
  connected: 'Conectado',
  connecting: 'Conectando...',
  disconnected: 'Desconectado'
}

const connectionStates = {
  connected: 'connected',
  disconnected: 'disconnected',
  connecting: 'connecting'
} as const

export function DriverDashboard () {
  const [driverInfo] = useState({
    name: 'Juan Pérez',
    vehicleId: 'BER-001',
    route: 'Montevideo - Punta del Este'
  })

  const [serverUrl] = useState('https://5f1e5019bc9b.ngrok-free.app')
  const [highAccuracy, setHighAccuracy] = useState(true)

  const { coordinates, isTracking, isLoadingTracking, error, isWatching, startWatching, stopWatching } = useLiveGeolocationSender(serverUrl, {
    enableHighAccuracy: highAccuracy,
    timeout: 10000,
    maximumAge: 30000,
    sendCoordinates: true
  })

  const [connectionStatus, setConnectionStatus] = useState<keyof typeof connectionStates>('disconnected')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    if (isWatching && !error) setConnectionStatus('connected')
    else if (isTracking) setConnectionStatus('connecting')
    else setConnectionStatus('disconnected')
  }, [isWatching, isTracking, isLoadingTracking, error])

  useEffect(() => {
    if (coordinates) setLastUpdate(new Date())
  }, [coordinates])

  const formatCoordinate = (coord: number | null) => (coord ? coord.toFixed(6) : 'N/A')
  const formatTime = (date: Date | null) => (date ? date.toLocaleTimeString('es-UY') : 'N/A')

  // Simplificamos: sólo cambiamos highAccuracy y el hook reinicia seguimiento si está activo
  const handlePrecisionChange = (newHighAccuracy: boolean) => {
    setConnectionStatus(connectionStates.disconnected)
    setHighAccuracy(newHighAccuracy)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
                    <path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z' />
                  </svg>
                </div>
                <span className='text-xl font-bold text-gray-900'>Berrutti</span>
              </div>
              <div className='hidden sm:block h-6 w-px bg-gray-300'></div>
              <div className='hidden sm:block'>
                <span className='text-sm text-gray-500'>Panel de Chofer</span>
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              {/* <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div> */}
              <div className={`${connectionColors[connectionStatus]} w-3 h-3 rounded-full`}></div>
              {/* <span className='text-sm font-medium text-gray-700'>{getStatusText()}</span> */}
              <span className='text-sm font-medium text-gray-700'>{connectionsTexts[connectionStatus]}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Driver Info Card */}
        <div className='bg-white rounded-lg shadow-sm border mb-8'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900'>Información del Conductor</h2>
          </div>
          <div className='px-6 py-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>Conductor</label>
                <p className='text-lg font-semibold text-gray-900'>{driverInfo?.name}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Vehículo</label>
                <p className='text-lg font-semibold text-gray-900'>{driverInfo?.vehicleId}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>Ruta</label>
                <p className='text-lg font-semibold text-gray-900'>{driverInfo?.route}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Location Controls */}
          <div className='bg-white rounded-lg shadow-sm border'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900'>Control de Ubicación</h3>
            </div>
            <div className='px-6 py-6'>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-700'>Estado del Seguimiento</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isWatching ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {isWatching ? 'Activo' : 'Inactivo'}
                  </span>
                </div>

                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-700'>Modo de Precisión</span>
                  <div className='flex items-center space-x-3'>
                    <span className={`text-xs font-medium ${!highAccuracy ? 'text-gray-900' : 'text-gray-500'}`}>
                      Baja
                    </span>
                    <button
                      onClick={() => handlePrecisionChange(!highAccuracy)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        highAccuracy ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                      // disabled={isTracking}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          highAccuracy ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-medium ${highAccuracy ? 'text-gray-900' : 'text-gray-500'}`}>
                      Alta
                    </span>
                  </div>
                </div>

                <div className='flex space-x-3'>
                  <button
                    onClick={stopWatching}
                    disabled={!isWatching}
                    className='flex-1 bg-red-500 hover:bg-red-600 touch:active:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors'
                  >
                    Detener Seguimiento
                  </button>

                  <button
                    onClick={startWatching}
                    disabled={isWatching || isLoadingTracking}
                    className='flex-1 bg-orange-500 hover:bg-orange-600 touch:active:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors'
                  >
                    {isLoadingTracking ? 'Iniciando...' : 'Iniciar Seguimiento'}
                  </button>
                </div>

                {error && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                    <div className='flex'>
                      <svg className='w-5 h-5 text-red-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <div className='ml-3'>
                        <h4 className='text-sm font-medium text-red-800'>Error</h4>
                        <p className='text-sm text-red-700 mt-1'>{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Location Data */}
          <div className='bg-white rounded-lg shadow-sm border'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900'>Datos de Ubicación</h3>
            </div>
            <div className='px-6 py-6'>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-500'>Latitud</label>
                    <p className='text-lg font-mono text-gray-900'>{formatCoordinate(coordinates?.latitude || null)}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500'>Longitud</label>
                    <p className='text-lg font-mono text-gray-900'>
                      {formatCoordinate(coordinates?.longitude || null)}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-500'>Precisión</label>
                    <p className='text-lg text-gray-900'>
                      {coordinates?.accuracy ? `${coordinates.accuracy.toFixed(0)}m` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500'>Modo de Precisión</label>
                    <p className='text-lg text-gray-900'>{highAccuracy ? 'Alta Precisión' : 'Baja Precisión'}</p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-500'>Velocidad</label>
                    <p className='text-lg text-gray-900'>
                      {coordinates?.speed ? `${(coordinates.speed * 3.6).toFixed(1)} km/h` : 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-500'>Última Actualización</label>
                  <p className='text-lg text-gray-900'>{formatTime(lastUpdate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Footer */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border'>
          <div className='px-6 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <div className={`w-2 h-2 rounded-full ${connectionColors[connectionStatus]}`}></div>
                <span className='text-sm text-gray-600'>Sistema de seguimiento {`${connectionsTexts[connectionStatus]}`.toLowerCase()}</span>
              </div>
              <div className='text-sm text-gray-500'>Berrutti © 2024 - Panel de Conductor</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
