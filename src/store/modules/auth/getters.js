export default {
  userId(state) {
    return state.userId
  },
  token(state) {
    return state.token
  },
  isAuthenticated(state) {
    // Convert token to a true boolean
    return !!state.token
  },
  didAutoLogout(state) {
    return state.didAutoLogout
  }
}
