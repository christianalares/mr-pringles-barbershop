import nookies from 'nookies'
import { createContext, useState, useEffect } from 'react'
import firebaseClient from '../config/firebaseClient'

export const authContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onIdTokenChanged(async firebaseUser => {
      setStatus('loading')
      if (!firebaseUser) {
        setUser(null)
        setStatus('idle')
        nookies.set(undefined, 'token', '')
        return
      }

      const token = await firebaseUser.getIdToken()

      setUser({
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
      })
      setStatus('success')

      nookies.set(undefined, 'token', token)
    })

    return () => unsubscribe()
  }, [])

  const login = (email, password) => {
    return firebaseClient
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })
  }

  const register = async (name, email, password) => {
    try {
      const newUser = await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
      await newUser.user.updateProfile({
        displayName: name,
      })
    } catch (error) {}
  }

  const logout = () => {
    firebaseClient
      .auth()
      .signOut()
      .then(() => {})
      .catch(error => {
        return error
      })
  }

  return (
    <authContext.Provider
      value={{
        user,
        status,
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
