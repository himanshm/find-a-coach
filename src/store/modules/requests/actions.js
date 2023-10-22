export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // coachId: payload.coachId, // Id of the coach to whom this request was sent and we don't send this to firebase.
      userEmail: payload.email,
      message: payload.message
    }
    const response = await fetch(
      `https://find-a-coach-vue-app-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    )

    const responseData = await response.json()
    newRequest.coachId = payload.coachId

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error
    }

    newRequest.id = responseData.name
    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    // Load all the request for only currently active user
    const coachId = context.rootGetters.userId
    const response = await fetch(
      `https://find-a-coach-vue-app-default-rtdb.firebaseio.com/requests/${coachId}.json`
    )
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch requests.')
      throw error
    }

    const requests = []
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    // Commit a mutation that receives these requests
    context.commit('setRequests', requests)
  }
}
