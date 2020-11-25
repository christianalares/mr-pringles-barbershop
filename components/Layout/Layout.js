import { BiLogOut } from 'react-icons/bi'
import useAuth from '../../utils/hooks/useAuth'
import Header from '../Header/Header'
import Button from '../Button/Button'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      {user ? (
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
      ) : null}
    </div>
  )
}

export default Layout
