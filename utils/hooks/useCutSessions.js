import { useContext } from 'react'
import { cutSessionsContext } from '../../providers/CutSessionsProvider'

const useCutSessions = () => {
  const cutSessions = useContext(cutSessionsContext)
  return cutSessions
}

export default useCutSessions
