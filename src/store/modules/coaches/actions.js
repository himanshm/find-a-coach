export default {
  // Transform the new coach data inside actions of coach module
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }
    context.commit('registerCoach', coachData)
  }
}
