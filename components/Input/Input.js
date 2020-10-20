import { forwardRef } from 'react'
import styles from './Input.module.scss'

const Input = forwardRef((props, ref) => {
  return <input ref={ref} className={styles.input} {...props} />
})

export default Input
