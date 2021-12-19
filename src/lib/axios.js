import axios from 'axios'
const { REACT_APP_SERVER } = process.env

if (!REACT_APP_SERVER)
  console.error('Please provide the REACT_APP_SERVER env variable')

// Esto es para no estar teniendo que importar el REACT_APP_SERVER
// en todos los archivos que hacen requests a la api
axios.defaults.baseURL = REACT_APP_SERVER

// Con esto, cada vez que se haga un request con axios, va a obtener el token 
// y colocarlo en los headers. Asi evitamos colocar el header en cada request.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['x-access-token'] = token
  config.headers['Content-Type'] = 'application/json'
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
