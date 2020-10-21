import { AnimatePresence, motion } from 'framer-motion'
import cn from 'clsx'
import styles from './Error.module.scss'

const Error = ({ show = false, className, message, ...restProps }) => {
  return show ? (
    <AnimatePresence>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(styles.error, { [className]: !!className })}
        {...restProps}
      >
        {message}
      </motion.span>
    </AnimatePresence>
  ) : null
}

export default Error
