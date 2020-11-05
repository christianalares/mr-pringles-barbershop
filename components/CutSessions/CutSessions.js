import { useState } from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import Modal from '../Modal/Modal'
import useCutSessions from '../../utils/hooks/useCutSessions'
import AddSessionForm from '../AddSessionForm/AddSessionForm'
import styles from './CutSessions.module.scss'
import Button from '../Button/Button'

const CutSessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { status, sessions } = useCutSessions()
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status !== 'success') {
    return null
  }

  return (
    <div className={styles.cutSessions}>
      {sessions.length === 0 && <p>There are no planned cutting sessions.</p>}
      <Button onClick={() => setIsModalOpen(true)} icon={BiPlusCircle}>
        Add a session
      </Button>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>{session.date}</li>
        ))}
      </ul>

      {/* closeModal={closeModal} */}
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <AddSessionForm />
      </Modal>
    </div>
  )
}

export default CutSessions
