import useLiveGeolocationSender from '@/hooks/useLiveGeolocationSender'

const URL = 'https://d14a9b0ad0e3.ngrok-free.app'
export function PruebaSeguimiento () {
  const { coordinates, error, isWatching, loading, startWatching, stopWatching } = useLiveGeolocationSender(URL, { enableHighAccuracy: true, sendCoordinates: true })
  
  console.log(coordinates)
  
  return (
    <div class='flex flex-col [&>*]:p-4'>
      <button class='w-fit' onClick={startWatching}>Start</button>
      <button class='w-fit' onClick={stopWatching}>Stop</button>
      <div>loading {loading}</div>
      <div>error {error}</div>
      <div>isWatching {isWatching}</div>
      <div>latitud {coordinates?.longitude}</div>
      <div>longitud {coordinates?.latitude}</div>
    </div>
  )
}
