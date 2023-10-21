export default {
  requests(state, _, _1, rootGetters) {
    // Filter requests for only the coaches that are active or registered
    const coachId = rootGetters.userId
    return state.requests.filter((request) => request.coachId === coachId)
  },
  hasRequests(_, getters) {
    // return state.requests && state.requests.length > 0
    // use the requests getter to check the filtered requests only
    return getters.requests && getters.requests.length > 0
  }
}
