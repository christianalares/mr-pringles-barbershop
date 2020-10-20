import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Kismo Motors</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
