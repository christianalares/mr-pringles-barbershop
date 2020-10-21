import Head from 'next/head'
import AuthProvider from '../providers/AuthProvider'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kismo Motors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider userFromServer={pageProps.user}>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
