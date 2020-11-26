import { BiLogOut } from 'react-icons/bi'
import useAuth from '../../utils/hooks/useAuth'
import Card from '../Card/Card'
import CutSessions from '../CutSessions/CutSessions'
import Button from '../Button/Button'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className={styles.dashboard}>
      <h1>Howdy, {user.name} 🤪</h1>

      <Card className={styles.card}>
        <CutSessions />
      </Card>

      <div className={styles.bottom}>
        <Button type="button" size="s" secondary icon={BiLogOut} onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
