import Header from '../Header/Header'
import Emoji from '../Emoji/Emoji'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          Made with <Emoji symbol="❤️" label="Heart" /> by Christian Alares
        </p>
      </footer>
    </div>
  )
}

export default Layout
