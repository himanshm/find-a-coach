// Always use getters to access the state
export default {
  coaches(state) {
    return state.coaches
  },
  // for ListCoaches component, we only want to render the list of coaches if there are some in the store
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },
  isCoach(_, getters, _1, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    return coaches.some((coach) => coach.id === userId)
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    if (!lastFetch) {
      // if lastFetch is null or falsy
      return true
    }
    const currentTimeStamp = new Date().getTime()
    return (currentTimeStamp - lastFetch) / 1000 > 60 // if the data was fetched more than a minute ago
  }
}
