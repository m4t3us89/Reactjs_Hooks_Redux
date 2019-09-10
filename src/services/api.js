import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'http://localhost:3333/api/'
})

export default instance
