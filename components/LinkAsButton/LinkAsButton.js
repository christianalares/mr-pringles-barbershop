/* eslint-disable react/button-has-type */
import { forwardRef } from 'react'
import cn from 'clsx'
import styles from './LinkAsButton.module.scss'
import buttonStyles from '../Button/Button.module.scss'

const LinkAsButton = forwardRef(
  ({ children, href, className, size = 'm', secondary = false, icon, ...restProps }, ref) => {
    const Icon = icon || null
    return (
      <a
        ref={ref}
        href={href}
        className={cn(buttonStyles.button, styles.linkAsButton, {
          [className]: !!className,
          [buttonStyles.small]: size === 's',
          [buttonStyles.medium]: size === 'm',
          [buttonStyles.secondary]: secondary,
          [buttonStyles.hasIcon]: !!icon,
        })}
        {...restProps}
      >
        {icon && <Icon />} {children}
      </a>
    )
  }
)

export default LinkAsButton
