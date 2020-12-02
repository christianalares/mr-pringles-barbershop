import { useContext } from 'react'
import { sessionsContext } from '../../providers/SessionsProvider'

const useSessions = () => {
  const cutSessions = useContext(sessionsContext)
  return cutSessions
}

export default useSessions
