import { useState } from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from '../Modal/Modal'
import useSessions from '../../utils/hooks/useSessions'
import AddSessionForm from '../AddSessionForm/AddSessionForm'
import Button from '../Button/Button'
import Error from '../Error/Error'
import CutSessionList from '../CutSessionList/CutSessionList'
import styles from './CutSessions.module.scss'

const CutSessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status, sessions, error } = useSessions()
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    console.error(error) // eslint-disable-line no-console
    return <Error show message={error.message} className={styles.errorMessage} />
  }

  if (status !== 'success') {
    return null
  }

  return (
    <div className={styles.cutSessions}>
      <AnimatePresence>
        {sessions.length > 0 && (
          <motion.h2
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            Current sessions
          </motion.h2>
        )}
      </AnimatePresence>
      {sessions.length === 0 ? <p>There are no planned cutting sessions.</p> : <CutSessionList />}

      <Button onClick={() => setIsModalOpen(true)} icon={BiPlusCircle}>
        Add session
      </Button>

      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <AddSessionForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}

export default CutSessions
