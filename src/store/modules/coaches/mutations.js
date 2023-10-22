export default {
  registerCoach(state, payload) {
    // The payload here is coachData in actions
    state.coaches.push(payload)
  },
  setCoaches(state, payload) {
    // Assuming payload is a list of coaches
    state.coaches = payload
  },
  // Timestamp for lastFetch
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
}
