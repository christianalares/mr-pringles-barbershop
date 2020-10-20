import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Register.module.scss'
import useAuth from '../../utils/hooks/useAuth'

const Register = () => {
  const nameRef = useRef()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setError("The password doesn't match")
    } else {
      register(name, email, password)
    }
  }

  return (
    <div className={styles.register}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            ref={nameRef}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button type="submit" disabled={false}>
          Register
        </button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account? <Link href="/">Login</Link>.
      </p>
    </div>
  )
}

export default Register
