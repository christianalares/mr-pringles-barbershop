import useAuth from '../utils/hooks/useAuth'
import Layout from '../components/Layout/Layout'
import Dashboard from '../components/Dashboard/Dashboard'
import Login from '../components/Login/Login'

const HomePage = () => {
  const { user, status } = useAuth()

  if (status === 'loading') {
    return null
  }

  return <Layout>{user ? <Dashboard /> : <Login />}</Layout>
}

export default HomePage
