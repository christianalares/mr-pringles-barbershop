import cn from 'clsx'
import styles from './ButtonAsLink.module.scss'

const ButtonAsLink = ({ children, className, onClick, ...restProps }) => {
  return (
    <button
      type="button"
      className={cn(styles.buttonAsLink, {
        [className]: !!className,
      })}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  )
}

export default ButtonAsLink
