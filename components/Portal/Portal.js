import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ children }) => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector('#__next')
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, ref.current) : null
}

export default Portal
