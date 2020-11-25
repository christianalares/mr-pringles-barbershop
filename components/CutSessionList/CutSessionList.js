import useCutSessions from '../../utils/hooks/useCutSessions'
import CutSession from '../CutSession/CutSession'
import styles from './CutSessionList.module.scss'

const CutSessionList = () => {
  const { sessions } = useCutSessions()
  return (
    <ul className={styles.cutSessionList}>
      {sessions.map(s => (
        <CutSession key={s.id} session={s} />
      ))}
    </ul>
  )
}

export default CutSessionList
