import useAuth from '../../utils/hooks/useAuth'
import Card from '../Card/Card'
import CutSessions from '../CutSessions/CutSessions'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className={styles.dashboard}>
      <h1>Howdy, {user.name} 🤪</h1>

      <Card className={styles.card}>
        <CutSessions />
      </Card>
    </div>
  )
}

export default Dashboard
