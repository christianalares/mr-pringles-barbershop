import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '../Card/Card'
import useAuth from '../../utils/hooks/useAuth'
import Label from '../Label/Label'
import Input from '../Input/Input'
import Button from '../Button/Button'
import Error from '../Error/Error'
import styles from './Register.module.scss'

const Register = () => {
  const nameRef = useRef()
  const { register, status, error, setStatus } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [clientError, setClientError] = useState(null)

  useEffect(() => {
    nameRef.current.focus()
    setStatus(null)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setClientError(null)
    if (password !== passwordConfirm) {
      setClientError("The password doesn't match")
    } else {
      register(name, email, password)
    }
  }

  return (
    <Card className={styles.register}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Label htmlFor="name">Name:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            ref={nameRef}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="password">Confirm password:</Label>
          <Input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Thinking...' : 'Register'}
        </Button>
      </form>
      <Error show={!!clientError} className={styles.errorMessage} message={clientError} />
      <Error show={status === 'error'} className={styles.errorMessage} message={error} />
      <p className={styles.registerText}>
        Already have an account? <Link href="/">Login</Link>.
      </p>
    </Card>
  )
}

export default Register
