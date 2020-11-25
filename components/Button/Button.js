/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { motion } from 'framer-motion'
import cn from 'clsx'
import styles from './Button.module.scss'

const Button = forwardRef(
  (
    {
      children,
      className,
      size = 'm',
      secondary = false,
      loading = false,
      icon,
      disabled,
      type = 'button',
      animated,
      ...restProps
    },
    ref
  ) => {
    const Icon = icon || null
    const C = animated ? motion.button : 'button'

    const getIcon = () => {
      if (loading) {
        return <AiOutlineLoading3Quarters className={styles.spinner} />
      }

      if (icon) {
        return <Icon />
      }
    }

    return (
      <C
        ref={ref}
        className={cn(styles.button, {
          [className]: !!className,
          [styles.xsmall]: size === 'xs',
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
      </C>
    )
  }
)

export default Button
