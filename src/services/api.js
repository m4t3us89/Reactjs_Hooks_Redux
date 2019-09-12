import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'http://localhost:3333/api/'
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const credentials = localStorage.getItem('credentials')
    if (credentials) {
      config.headers = {
        Authorization: `bearer ${JSON.parse(credentials).token}`
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    console.log(error.response)
    const {
      status: statusCode,
      config: { baseURL: url }
    } = error.response
    if (
      (statusCode === 401 || statusCode === 403) &&
      url.indexOf('authenticate') === -1
    ) {
      localStorage.removeItem('credentials')
      window.location.href = '/401'
    }

    return Promise.reject(error)
  }
)

export default instance
