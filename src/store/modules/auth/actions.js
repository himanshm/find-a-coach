const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY

// make sure only one timer is active at a time
let timer

export default {
  async login(context, payload) {
    return context.dispatch('authAction', {
      ...payload
    })
  },

  async signup(context, payload) {
    return context.dispatch('authAction', {
      ...payload
    })
  },

  async authAction(context, payload) {
    const isLoggingIn = payload.actionType === 'login'
    const url = isLoggingIn
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to autheticate!')
      throw error
    }

    // Token expiration logic
    const expiresIn = +responseData.expiresIn * 1000 // in ms
    // const expiresIn = 5000  // For testing
    // Current date + expiration Duration
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    // Set a timer whenever the user is logged in so that we automatically log the user out when that timer expires
    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    })
  },

  // We will dispatch the follwing action whenever our app starts, to check whether we can log the user in automatically
  tryLogin(context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // Timestamp in the future
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    // Difference of Times
    const expiresIn = +tokenExpiration - new Date().getTime()

    // if token is invalid, don't continue with logging the user in
    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expiresIn)

    if (token && userId) {
      // if token and userId exists in local localStorage, log the user in automatically
      context.commit('setUser', {
        token: token,
        userId: userId
      })
    }
  },

  logout(context) {
    // Auto Logout
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    // Clear the ongoing timer when the user logs out
    clearTimeout(timer)

    // We can only clear all the data above to log user out
    context.commit('setUser', {
      token: null,
      userId: null
    })
  },

  // Redirecting the user upon auto logout
  autoLogout(context) {
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
}
