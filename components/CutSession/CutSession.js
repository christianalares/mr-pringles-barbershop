import Confetti from 'react-dom-confetti'
import { FaLock } from 'react-icons/fa'
import cn from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../Button/Button'
import getTimeEmoji from '../../utils/getTimeEmoji'
// import useSessions from '../../utils/hooks/useSessions'
import useSession from '../../utils/hooks/useSession'
import useAuth from '../../utils/hooks/useAuth'
import Error from '../Error/Error'
import styles from './CutSession.module.scss'

const confettiConfig = {
  angle: 90,
  spread: '30',
  startVelocity: '20',
  elementCount: '40',
  dragFriction: 0.12,
  duration: '1500',
  stagger: '10',
  width: '10px',
  height: '5px',
  perspective: '809px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const CutSession = ({ cutSession }) => {
  const sessionDate = new Date(cutSession.day)

  const { status, error, session, book, unbook } = useSession(cutSession.id)

  const { user } = useAuth()

  if (status !== 'success') {
    return null
  }

  const alreadyHaveOneBooked =
    session.slots.filter(slot => slot.bookedBy?.email === user.email).length > 0

  return (
    <li key={session.id} className={styles.cutSession}>
      <h3>
        {new Intl.DateTimeFormat(window.navigator.language, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).format(sessionDate)}
      </h3>
      <Error show={status === 'error'} message={error} className={styles.bookingError} />
      <ul className={styles.slotList}>
        {session.slots.map(slot => {
          const isBooked = !!slot.bookedBy
          const isYourBooking = slot.bookedBy?.email === user.email

          return (
            <li key={slot.startTime}>
              <span
                className={cn(styles.time, {
                  [styles.isBooked]: isBooked,
                })}
              >{`${getTimeEmoji(slot.startTime)} ${slot.startTime} - ${slot.endTime}`}</span>
              <div>
                <div className={styles.confettiWrapper}>
                  <Confetti active={isBooked} config={confettiConfig} />
                </div>
                <AnimatePresence exitBeforeEnter>
                  {isBooked ? (
                    isYourBooking ? (
                      <Button
                        type="button"
                        onClick={() => unbook(slot.id)}
                        size="xs"
                        className={styles.unbookButton}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <motion.span
                        className={styles.booked}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <FaLock /> {slot.bookedBy.name}
                      </motion.span>
                    )
                  ) : (
                    <Button
                      type="button"
                      onClick={() => book(slot.id)}
                      size="xs"
                      className={styles.bookButton}
                      disabled={alreadyHaveOneBooked}
                      animated
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      Book
                    </Button>
                  )}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default CutSession
