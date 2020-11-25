// import Image from 'next/image'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src="/img/mrpringles-face.png" alt="Mr. Pringles Barbershop" />
      <span className={styles.logoText}>Mr. Pringles Barbershop</span>
    </div>
  )
}

export default Logo
