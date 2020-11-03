import { BiLogOut } from 'react-icons/bi'
import useAuth from '../../utils/hooks/useAuth'
import Card from '../Card/Card'
import CutSessions from '../CutSessions/CutSessions'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <Card className={styles.dashboard}>
      <h2>Howdy, {user.name} 🤪</h2>
      <button className={styles.logoutButton} type="button" onClick={logout}>
        <BiLogOut />
      </button>
      <CutSessions />
    </Card>
  )
}

export default Dashboard
