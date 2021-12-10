import axios from 'axios'

// Con esto, cada vez que se haga un request con axios, va a obtener el token y colocarlo en los headers. Asi evitamos colocar el header en cada request.
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers['x-access-token'] = token

  return config
})
