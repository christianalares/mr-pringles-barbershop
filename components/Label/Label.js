/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './Label.module.scss'

const Label = ({ children, ...restProps }) => {
  return (
    <label className={styles.label} {...restProps}>
      {children}
    </label>
  )
}

export default Label
