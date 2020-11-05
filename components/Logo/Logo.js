import Image from 'next/image'
import styles from './Logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.logo}>
      {/* <Image src="/img/mrpringles-face.png" alt="Mr. Pringles Barbershop" /> */}
      <Image
        src="/img/mrpringles-face.png"
        width="70px"
        height="70px"
        alt="Mr. Pringles Barbershop"
      />
      <h1>Mr. Pringles Barbershop</h1>
    </div>
  )
}

export default Logo
