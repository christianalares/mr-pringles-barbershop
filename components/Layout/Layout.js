import Logo from '../Logo/Logo'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <header>
        <Logo />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
