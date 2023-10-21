export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: payload.coachId, // Id of the coach to whom this request was sent
      userEmail: payload.email,
      message: payload.message
    }
    context.commit('addRequest', newRequest)
  }
}
