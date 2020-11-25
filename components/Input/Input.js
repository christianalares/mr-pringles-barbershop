import { forwardRef } from 'react'
import cn from 'clsx'
import styles from './Input.module.scss'

const Input = forwardRef(({ className, size = 'm', ...restProps }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(styles.input, {
        [className]: !!className,
        [styles.small]: size === 's',
      })}
      {...restProps}
      {...(restProps.type === 'number' ? { pattern: '[0-9]*' } : {})}
    />
  )
})

export default Input
