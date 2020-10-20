import useAuth from '../utils/hooks/useAuth'
import Layout from '../components/Layout/Layout'
import Register from '../components/Register/Register'
import redirectToRoute from '../utils/redirectToRoute'

const RegisterPage = () => {
  const { status, user } = useAuth()

  if (status === 'loading') {
    return null
  }

  if (user) {
    redirectToRoute('/')
    return null
  }

  return (
    <Layout>
      <Register />
    </Layout>
  )
}

export default RegisterPage
