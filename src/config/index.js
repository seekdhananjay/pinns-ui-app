export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://pinns-api-server.herokuapp.com'
  : 'https://localhost:8080'

export const LOGIN_PROVIDERS = ['github']