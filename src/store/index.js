import { createStore } from 'vuex'

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
    modules: {
        coaches: coachesModule, // Key here will be used in namespacing
        requests: requestsModule
    },
    // manage a root state to check for a user being a coach and hide the register as a coach button after registration
    state() {
        return {
            // Should be used when a user sign ups as a coach and thereafter to verify whether we already got a coach.
            userId: 'c3'
        }
    },
    getters: {
        userId(state) {
            return state.userId
        }
    }
})


export default store