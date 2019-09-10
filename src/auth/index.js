const isAuthenticated = () => {
  const credentials = JSON.parse(localStorage.getItem('credentials'))

  if (!credentials) return false
  return true
}
export default isAuthenticated
