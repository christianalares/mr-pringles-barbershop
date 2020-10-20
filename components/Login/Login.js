import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import useAuth from '../../utils/hooks/useAuth'
import Input from '../Input/Input'
import Label from '../Label/Label'
import Button from '../Button/Button'
import styles from './Login.module.scss'

const Login = () => {
  const emailRef = useRef()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { logout, login, user } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className={styles.login}>
      <h2>
        Login{' '}
        {user && (
          <button type="button" onClick={logout}>
            Log out
          </button>
        )}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            ref={emailRef}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <Label htmlFor="password">Lösenord:</Label>
          <Input
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={false}>
          Login
        </Button>
      </form>
      {false && <p>Något gick fel, försök igen!</p>}
      <p>
        Don&apos;t have an account? <Link href="/register">Register</Link>.
      </p>
    </div>
  )
}

export default Login
