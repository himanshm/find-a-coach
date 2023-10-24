<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested! Reach out Now!</h2>
          <!-- add a router-link to navigate to contact page through a dynamic id (hard-coded for now) -->
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <!-- render the child route of this component which is contact route -->
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  // Why do we get id as a prop here? This component is loaded through routing on path '/coaches/:id', therefore
  // theoretically it wouldn't get any props at all. The router loads it and router by default passes no props
  // Adding true to the route config, we ensure that the dynamic value :id in the route is passed in as a prop of
  // the same name. The vue router will pass the value :id holds as a prop to CoachDetail page.
  // We can use this id to fetch the relevant coach data from the store.
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    }
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
    },
    contactLink() {
      return `${this.$route.path}/contact` // There is a bug here.
    },
    areas() {
      return this.selectedCoach.areas
    },
    rate() {
      return this.selectedCoach.hourlyRate
    },
    description() {
      return this.selectedCoach.description
    }
  },
  // As soon as the component is created, we fetch the coach data from store
  created() {
    // get all coaches and find the one whose id matches that we get from route
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    )
  }
}
</script>
