/* eslint-disable react/button-has-type */

import styles from './Button.module.scss'

const Button = ({ children, ...restProps }) => {
  return (
    <button className={styles.button} {...restProps}>
      {children}
    </button>
  )
}

export default Button
