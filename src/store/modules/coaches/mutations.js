export default {
    registerCoach(state, payload) {
        // The payload here is coachData in actions
        state.coaches.push(payload);
    }
};
