import { BiLogOut } from 'react-icons/bi'
import useAuth from '../../utils/hooks/useAuth'
import Card from '../Card/Card'
import CutSessions from '../CutSessions/CutSessions'
import styles from './Dashboard.module.scss'
import Button from '../Button/Button'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <Card className={styles.dashboard}>
      <h2>Howdy, {user.name} 🤪</h2>
      <Button
        type="button"
        className={styles.logoutButton}
        size="s"
        secondary
        icon={BiLogOut}
        onClick={logout}
      >
        Logout
      </Button>
      <CutSessions />
    </Card>
  )
}

export default Dashboard
