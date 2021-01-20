import { createContext, useState, useEffect, useRef, useCallback } from 'react'
import { isToday, isFuture } from 'date-fns'
import { db } from '../config/firebaseClient'

export const sessionsContext = createContext()

const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const { current: sessionRef } = useRef(db.collection('sessions'))

  const onSessionsStateChange = useCallback(() => {
    return sessionRef.onSnapshot(
      snapshot => {
        const tempSessions = []
        snapshot.forEach(doc => {
          tempSessions.push({
            id: doc.id,
            day: doc.data().day,
          })
        })

        const tempSessionsFromTodayAndForward = tempSessions.filter(session => {
          const date = new Date(session.day)
          return isToday(date) || isFuture(date)
        })

        setSessions(tempSessionsFromTodayAndForward)
        setStatus('success')
      },
      err => {
        setError(err)
        setStatus('error')
      }
    )
  }, [sessionRef])

  useEffect(() => {
    setStatus('loading')
    const unsubscribe = onSessionsStateChange()

    return () => {
      unsubscribe()
      setStatus('idle')
    }
  }, [onSessionsStateChange])

  const add = async session => {
    const createdSessionRef = await sessionRef.add({
      day: session.day,
    })

    session.slots.forEach(slot => {
      createdSessionRef.collection('slots').add({ ...slot, bookedBy: null })
    })
  }

  return (
    <sessionsContext.Provider
      value={{
        sessions,
        add,
        status,
        error,
      }}
    >
      {children}
    </sessionsContext.Provider>
  )
}

export default SessionsProvider
