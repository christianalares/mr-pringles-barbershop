import { createContext, useState, useEffect } from 'react'
import firebaseApp from '../config/firebaseClient'

export const cutSessionsContext = createContext()

const formatDate = date =>
  new Intl.DateTimeFormat(window?.navigator?.language || 'sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)

const CutSessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const onCutSessionsStateChange = () => {
    return firebaseApp
      .firestore()
      .collection('sessions')
      .onSnapshot(
        querySnapshot => {
          const s = []
          querySnapshot.forEach(doc => {
            s.push({
              ...doc.data(),
              id: doc.id,
              date: formatDate(doc.data().date.toDate()),
            })
          })
          setSessions(s)
          setStatus('success')
        },
        err => {
          setError(err)
          setStatus('error')
        }
      )
  }

  useEffect(() => {
    setStatus('loading')
    const unsubscribe = onCutSessionsStateChange()

    return () => {
      unsubscribe()
    }
  }, [])

  const add = () => {
    console.log('add')
  }

  const update = async () => {
    console.log('update')
  }

  return (
    <cutSessionsContext.Provider
      value={{
        sessions,
        add,
        update,
        status,
        error,
      }}
    >
      {children}
    </cutSessionsContext.Provider>
  )
}

export default CutSessionsProvider
