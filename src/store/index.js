import { createStore } from 'vuex'

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';
import authModule from './modules/auth/index'

const store = createStore({
    modules: {
        coaches: coachesModule, // Key here will be used in namespacing
        requests: requestsModule,
        auth: authModule
    },
})


export default store