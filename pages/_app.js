import Head from 'next/head'
import AuthProvider from '../providers/AuthProvider'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mr Pringles Barbershop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider userFromServer={pageProps.user}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
