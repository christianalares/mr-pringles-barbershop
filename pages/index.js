import nookies from 'nookies'
import firebaseAdmin from '../config/firebaseAdmin'
import useAuth from '../utils/hooks/useAuth'
import SessionsProvider from '../providers/SessionsProvider'
import Layout from '../components/Layout/Layout'
import Dashboard from '../components/Dashboard/Dashboard'
import Login from '../components/Login/Login'

const HomePage = () => {
  const { user } = useAuth()

  return (
    <Layout>
      {user ? (
        <SessionsProvider>
          <Dashboard />
        </SessionsProvider>
      ) : (
        <Login />
      )}
    </Layout>
  )
}

export const getServerSideProps = async ctx => {
  const { token } = nookies.get(ctx)

  if (!token) {
    return {
      props: {
        user: null,
      },
    }
  }

  try {
    const decodedUser = await firebaseAdmin.auth().verifyIdToken(token)

    return {
      props: {
        user: decodedUser,
      },
    }
  } catch (error) {
    return {
      props: {
        user: null,
      },
    }
  }
}

export default HomePage
