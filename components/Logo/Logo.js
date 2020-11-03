import logo from './mrpringles-face.png'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Mr. Pringles Barbershop" />
      <h1>Mr. Pringles Barbershop</h1>
    </div>
  )
}

export default Logo
