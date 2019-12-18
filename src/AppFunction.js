import React, { useState, useEffect } from 'react'

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
}

export const App = () => {
  const [count, setCount] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [status, setStatus] = useState(navigator.onLine)
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  )
  let mounted = true

  useEffect(() => {
    // runs after every render
    document.title = `You have clicked ${count} times`
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    navigator.geolocation.getCurrentPosition(handleGeoLocation)
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation)
    // clean up function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      navigator.geolocation.clearWatch(watchId)
      mounted = false
    }
  }, [count])

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1)
  }

  const toggleLight = () => {
    setIsOn(prevState => !prevState)
  }

  const handleOnline = () => {
    setStatus(true)
  }

  const handleOffline = () => {
    setStatus(false)
  }

  const handleGeoLocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      })
    }
  }

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    })
  }

  return (
    <>
      <h1>Hello World</h1>
      <p>I am a function comp</p>
      <h2>Counter</h2>
      <p>count is {count}</p>
      <button onClick={incrementCount}>Add One to Count</button>

      <h2>Toggle Light</h2>

      <img
        src={
          isOn
            ? 'https://icon.now.sh/highlight/fd0'
            : 'https://icon.now.sh/highlight/aaa'
        }
        style={{ height: '50px', width: '50px' }}
        onClick={toggleLight}
        alt="light bulb"
      />

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePosition, null, 2)}
      <br />

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? 'online' : 'offline'}</strong>
      </p>

      <h2>GeoLocation</h2>

      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Speed is {speed ? speed : '0'}</p>
    </>
  )
}
