import useAuth from '../../utils/hooks/useAuth'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>
        You are logged in.{' '}
        <button type="button" onClick={logout}>
          Logout
        </button>
      </p>
    </div>
  )
}

export default Dashboard
