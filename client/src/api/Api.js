import axios from 'axios'
axios.defaults.withCredentials = true

//superadmin

export async function superAdminRegistration(registrationData) {
  return await axios.post(
    'http://localhost:8000/register',
    registrationData
  )
}

export async function adminLogin(loginData) {
  return await axios.post('http://localhost:8000/login', loginData)
}

export async function superAdminLogout() {
  return await axios.get('http://localhost:8000/logout')
}

export async function superAdminProtect() {
  return await axios.get('http://localhost:8000/protected')
}