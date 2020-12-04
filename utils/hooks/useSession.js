import { useEffect, useState, useCallback, useRef } from 'react'
import { db } from '../../config/firebaseClient'
import useAuth from './useAuth'

const useSession = sessionId => {
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [bookingError, setBookingError] = useState(null)
  const { user } = useAuth()
  const { current: sessionRef } = useRef(db.collection('sessions'))

  const onSessionStateChange = useCallback(() => {
    return sessionRef
      .doc(sessionId)
      .collection('slots')
      .onSnapshot(
        snapshot => {
          const tempSlots = []
          snapshot.forEach(doc => {
            tempSlots.push({
              id: doc.id,
              ...doc.data(),
            })
          })

          setSession({
            id: sessionId,
            slots: tempSlots,
          })
          setStatus('success')
        },
        err => {
          setError(err)
          setStatus('error')
        }
      )
  }, [sessionId, sessionRef])

  useEffect(() => {
    const unsubscribe = onSessionStateChange()

    return () => {
      unsubscribe()
    }
  }, [onSessionStateChange])

  const book = async slotId => {
    const alreadyHaveOneBooked =
      session.slots.filter(slot => slot.bookedBy?.email === user.email).length > 0

    if (alreadyHaveOneBooked) {
      setBookingError('You already have a booked slot')
    } else {
      const slotRef = await sessionRef.doc(session.id).collection('slots').doc(slotId)
      slotRef.update({
        bookedBy: user,
      })
    }
  }

  const unbook = async slotId => {
    const slotRef = await sessionRef.doc(session.id).collection('slots').doc(slotId)
    slotRef.update({
      bookedBy: null,
    })
  }

  return {
    session,
    status,
    error,
    book,
    unbook,
    bookingError,
  }
}

export default useSession
