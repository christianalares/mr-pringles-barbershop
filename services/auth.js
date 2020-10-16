import axios from 'axios'

export const postLogin = values => {
  return axios.post('/api/login', values)
}
