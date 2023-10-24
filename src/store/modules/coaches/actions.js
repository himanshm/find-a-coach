export default {
  // Transform the new coach data inside actions of coach module
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }
    // .json is added for firebase only nothing vue specific
    // And anything after the url creates an entry in firebase
    // await is used before a promise

    const token = context.rootGetters.token
    const response = await fetch(
      `https://find-a-coach-vue-app-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        // method below is PUT as the id of the coach will already exist after adding authentication to the app and one would first
        // need to sign up and after can become a coach if one wants to
        // In PUT request, data will be overwritten if already existed or creaed if it didn't exist
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    )

    // const responseData = await response.json() // json method also returns a promise
    // The response object has an ok field
    if (!response.ok) {
      // error
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  },

  async loadCoaches(context, payload) {
    // Before we fetch coaches I want to check if we actually should fetch coaches
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }
    const response = await fetch(
      // Fetch all coaches from coaches node
      `https://find-a-coach-vue-app-default-rtdb.firebaseio.com/coaches.json`
    )
    const responseData = await response.json()

    if (!response.ok) {
      // Create a new error object with Error constructor function
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error
      // Whenever an error is thrown in a dispatched action, the component that did dispatch it, can handle it.
    }

    const coaches = []
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    // Commit mutation for lastFetch data
    context.commit('setFetchTimestamp')
  }
}
