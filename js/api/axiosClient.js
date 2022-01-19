import axios from 'axios'
import queryString from 'query-string'
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'content-type': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  // paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config
})
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    console.log('axiosClient - response error', error.response)
    if (!error.response) throw new Error('Network error. Please try again later.')

    //redirect to login if not login
    // if (error.response.status === 401) {
    //   window.location.assign('/login');
    // }

    throw new Error(error)
  }
)
export default axiosClient
