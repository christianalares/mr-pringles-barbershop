import { Children } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'clsx'
import styles from './Error.module.scss'

const Error = ({ show = false, className, message, children, ...restProps }) => {
  const shouldShowChildren = Children.count(children) > 0

  if (shouldShowChildren && message) {
    console.error('You cannot use message and children at the same time') // eslint-disable-line no-console
    return null
  }

  return show || shouldShowChildren ? (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className={cn(styles.error, { [className]: !!className })}
        {...restProps}
      >
        {message || children}
      </motion.span>
    </AnimatePresence>
  ) : null
}

export default Error
