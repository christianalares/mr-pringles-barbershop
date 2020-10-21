import nookies from 'nookies'
import firebaseAdmin from '../config/firebaseAdmin'
import useAuth from '../utils/hooks/useAuth'
import Layout from '../components/Layout/Layout'
import Register from '../components/Register/Register'
import redirectToRoute from '../utils/redirectToRoute'

const RegisterPage = () => {
  const { user } = useAuth()

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
    await firebaseAdmin.auth().verifyIdToken(token)
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
    return
  } catch (error) {
    return {
      props: {
        user: null,
      },
    }
  }
}

export default RegisterPage
