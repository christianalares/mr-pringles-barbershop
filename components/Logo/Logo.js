import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.imageWrapper}>
        <img src="/img/mr-pringles-logo-transparent-dark.png" alt="Mr. Pringles Barbershop" />
      </div>
    </div>
  )
}

export default Logo
