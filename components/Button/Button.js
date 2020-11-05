/* eslint-disable react/button-has-type */
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import cn from 'clsx'
import styles from './Button.module.scss'

const Button = ({
  children,
  className,
  size = 'm',
  secondary = false,
  loading = false,
  icon,
  disabled,
  type = 'button',
  ...restProps
}) => {
  const Icon = icon || null

  const getIcon = () => {
    if (loading) {
      return <AiOutlineLoading3Quarters className={styles.spinner} />
    }

    if (icon) {
      return <Icon />
    }
  }

  return (
    <button
      className={cn(styles.button, {
        [className]: !!className,
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.secondary]: secondary,
        [styles.hasIcon]: loading || !!icon,
      })}
      disabled={loading || disabled}
      type={type}
      {...restProps}
    >
      {getIcon()} {children}
    </button>
  )
}

export default Button
