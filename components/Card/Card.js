import cn from 'clsx'
import styles from './Card.module.scss'

const Card = ({ children, className, ...restProps }) => {
  return (
    <div className={cn(styles.card, { [className]: !!className })} {...restProps}>
      {children}
    </div>
  )
}

export default Card
