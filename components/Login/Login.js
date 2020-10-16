import { useMutation } from 'react-query'
import styles from './Login.module.scss'
import { postLogin } from '../../services/auth'

const Login = () => {
  const inputRef = React.useRef()
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  const [password, setPassword] = React.useState('')
  const [login, { isLoading, error }] = useMutation(postLogin, {
    onSettled: () => setPassword(''),
  })

  const handleSubmit = async e => {
    e.preventDefault()
    login({ password })
  }

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Lösenord:</label>
        <input
          type="password"
          name="Password"
          id="password"
          value={password}
          ref={inputRef}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loggar in...' : 'Logga in'}
        </button>
      </form>
      {error && <p>Något gick fel, försök igen!</p>}
    </div>
  )
}

export default Login
