import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import useOnClickOutside from '../../utils/hooks/useOnClickOutside'
import Portal from '../Portal/Portal'
import styles from './Modal.module.scss'

const container = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
}

const item = {
  hide: {
    opacity: 0,
    y: 25,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      easing: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

const ModalBody = ({ children, closeModal }) => {
  const modalRef = useRef()
  useOnClickOutside(modalRef, closeModal)

  useEffect(() => {
    const keyDownHandler = e => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', keyDownHandler)
    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [closeModal])

  return (
    <motion.div
      ref={modalRef}
      className={styles.modal}
      variants={item}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <button type="button" className={styles.closeButton} onClick={closeModal}>
        <CgClose />
      </button>
      {children}
    </motion.div>
  )
}

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <motion.div
            className={styles.overlay}
            variants={container}
            transition={{
              duration: 0.2,
            }}
            initial="hide"
            animate="show"
            exit="hide"
          />
          <div className={styles.modalWrapper}>
            <ModalBody closeModal={closeModal}>{children}</ModalBody>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  )
}

export default Modal
