import { useEffect, useState, useCallback } from 'react'
import firebaseApp from '../../config/firebaseClient'
import useAuth from './useAuth'

const useSession = sessionId => {
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const { user } = useAuth()

  const onSessionStateChange = useCallback(() => {
    return firebaseApp
      .firestore()
      .collection('sessions')
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
  }, [sessionId])

  useEffect(() => {
    const unsubscribe = onSessionStateChange()

    return () => {
      unsubscribe()
    }
  }, [onSessionStateChange])

  const book = slotId => {
    console.log('book', user, slotId)
  }

  const unbook = slotId => {
    console.log('unbook', user, slotId)
  }

  return {
    session,
    status,
    error,
    book,
    unbook,
  }
}

export default useSession
