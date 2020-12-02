import useSessions from '../../utils/hooks/useSessions'
import CutSession from '../CutSession/CutSession'
import styles from './CutSessionList.module.scss'

const CutSessionList = () => {
  const { sessions } = useSessions()
  console.log('sessions:', sessions)
  return (
    <ul className={styles.cutSessionList}>
      {sessions.map(s => (
        <CutSession key={s.id} cutSession={s} />
      ))}
    </ul>
  )
}

export default CutSessionList
