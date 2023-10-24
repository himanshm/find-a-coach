<!-- Coach data should be fetched when the coaches page is visited or or the Refresh button is clicked and this will only happen when the CoachesList component will be loaded on to the screen. This doesn't mean that we have to do the entire send the request and parse the response logic in this component, instead we can leverage the vuex for that and add an action for fetching data and a mutation for using that fetched data. Just dispatch that action here in this component -->

<template>
  <div>
    <!-- Two exclaimation marks !! convert a truthy value ( a string ) to a real true Boolean -->
    <base-dialog :show="!!error" title="An Error Occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <!-- First Button to allow us to refresh the list of coaches -->
          <!-- Load the coaches from server/vuex store when this button is pressed -->
          <!-- Force Refresh when the refresh button is clicked -->
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <!-- Upon clicking on the below button we want the users to be redirected to '/register' route => add a query parameter -->
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">
            Login to Register as a Coach
          </base-button>
          <base-button v-if="showRegisterButton" link to="/register">
            Register as Coach
          </base-button>
        </div>
        <!-- We either are loading so we show the loading spinner or we have coaches so we show coaches or we have none and show NO COACHES FOUND -->
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>NO COACHES FOUND!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  computed: {
    showRegisterButton() {
      return this.isLoggedIn && !this.isCoach && !this.isLoading
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoaches() {
      // We will have to reach the getter through its namespace
      // return this.$store.getters['coaches/coaches'] // namespace/getter
      // After setting setFilters methods, return only the coaches based on the filters set and not all
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },
    hasCoaches() {
      // Should only be rendered if we have coaches and not loading so we are loading we never show the list of coaches
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    }
  },
  created() {
    this.loadCoaches() // Load the coaches when the component is created
    // When called without an argument, the default value of false is used for refresh parameter
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh }) // dispatch here return a promise so we wait for this promise to complete
      } catch (error) {
        this.error = error.message || 'Something went wrong!'
      }
      this.isLoading = false
    },
    // We can find out whether we're loading or not even though the request is being send with the help of vuex. Because when we dispatch an action, it can also return something to the component where it is being called. Since a promise is being returned when the above action is dipatched in vuex, we can listen to this promise completion and when it is completed, we are not loading anymore.
    handleError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
