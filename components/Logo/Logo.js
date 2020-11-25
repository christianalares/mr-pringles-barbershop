// import Image from 'next/image'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src="/img/mrpringles-face.png" alt="Mr. Pringles Barbershop" />
      <h1>Mr. Pringles Barbershop</h1>
    </div>
  )
}

export default Logo
