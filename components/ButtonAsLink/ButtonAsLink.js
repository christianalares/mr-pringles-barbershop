import { motion } from 'framer-motion'
import cn from 'clsx'
import styles from './ButtonAsLink.module.scss'

const ButtonAsLink = ({ children, className, onClick, animated, ...restProps }) => {
  const C = animated ? motion.button : 'button'
  return (
    <C
      type="button"
      className={cn(styles.buttonAsLink, {
        [className]: !!className,
      })}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </C>
  )
}

export default ButtonAsLink
