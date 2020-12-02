import { createContext, useState, useEffect } from 'react'
import firebaseApp from '../config/firebaseClient'
import useAuth from '../utils/hooks/useAuth'

export const sessionsContext = createContext()

const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [bookingError, setBookingError] = useState(null)
  const { user } = useAuth()

  const onSessionsStateChange = () => {
    return firebaseApp
      .firestore()
      .collection('sessions')
      .onSnapshot(
        snapshot => {
          const tempSessions = []
          snapshot.forEach(doc => {
            tempSessions.push({
              id: doc.id,
              day: doc.data().day,
            })
          })

          setSessions(tempSessions)
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
    const unsubscribe = onSessionsStateChange()

    return () => {
      unsubscribe()
      setStatus('idle')
    }
  }, [])

  const add = session => {
    const sessionToAdd = {
      ...session,
      slots: session.slots.map(slot => ({
        ...slot,
        bookedBy: null,
      })),
    }

    return firebaseApp.firestore().collection('sessions').add(sessionToAdd)
  }

  const book = async (sessionId, slotFrom) => {
    const docRef = firebaseApp.firestore().collection('sessions')
    const doc = await docRef.doc(sessionId).get()
    const data = doc.data()

    const alreadyHaveOneBooked =
      data.slots.filter(slot => slot.bookedBy?.email === user.email).length > 0

    if (alreadyHaveOneBooked) {
      setBookingError(prev => ({
        ...prev,
        [sessionId]: 'You already have a booked slot',
      }))
    } else {
      const newSlots = data.slots.map(slot =>
        slot.from === slotFrom
          ? {
              ...slot,
              bookedBy: {
                name: user.name,
                email: user.email,
              },
            }
          : slot
      )

      setBookingError(prev => ({
        ...prev,
        [sessionId]: null,
      }))

      return docRef.doc(sessionId).update({
        slots: newSlots,
      })
    }
  }

  const unbook = async (sessionId, slotFrom) => {
    setBookingError(prev => ({
      ...prev,
      [sessionId]: null,
    }))
    const docRef = firebaseApp.firestore().collection('sessions')
    const doc = await docRef.doc(sessionId).get()
    const data = doc.data()

    const newSlots = data.slots.map(slot =>
      slot.from === slotFrom
        ? {
            ...slot,
            bookedBy: null,
          }
        : slot
    )

    return docRef.doc(sessionId).update({
      slots: newSlots,
    })
  }

  return (
    <sessionsContext.Provider
      value={{
        sessions,
        bookingError,
        add,
        book,
        unbook,
        status,
        error,
      }}
    >
      {children}
    </sessionsContext.Provider>
  )
}

export default SessionsProvider
