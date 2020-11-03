import nookies from 'nookies'
import { createContext, useState, useEffect } from 'react'
import firebaseApp from '../config/firebaseClient'

export const authContext = createContext()

const AuthProvider = ({ userFromServer, children }) => {
  const [user, setUser] = useState(
    userFromServer
      ? {
          uid: userFromServer.uid,
          name: userFromServer.name,
          email: userFromServer.email,
        }
      : null
  )
  const [status, setStatus] = useState(userFromServer ? 'success' : 'idle')
  const [error, setError] = useState(null)

  const onAuthStateChange = () => {
    return firebaseApp.auth().onIdTokenChanged(async (firebaseUser, err) => {
      if (err) {
        setStatus('error')
        setError(err.message)
        setUser(null)
        return
      }

      if (!firebaseUser) {
        nookies.set(null, 'token', '')
        setUser(null)
        setError(null)
        setStatus('idle')
      } else {
        const token = await firebaseUser.getIdToken()
        nookies.set(null, 'token', token)

        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        })
        setStatus('success')
        setError(null)
      }
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange()

    return () => {
      unsubscribe()
    }
  }, [])

  const login = (email, password) => {
    setStatus('loading')
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => res)
      .catch(err => {
        setError(err.message)
        setStatus('error')
        return err
      })
  }

  const register = async (name, email, password) => {
    setStatus('loading')
    setError(null)

    try {
      const newUser = await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      await newUser.user.updateProfile({
        displayName: name,
      })
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  const logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {})
      .catch(err => {
        /* eslint-disable-next-line no-console */
        console.error('There was an error trying to log out', err.message)
      })
  }

  return (
    <authContext.Provider
      value={{
        user,
        status,
        error,
        setStatus,
        register,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
