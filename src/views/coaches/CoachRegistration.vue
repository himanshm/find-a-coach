<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
export default {
  components: {
    CoachForm
  },
  methods: {
    saveData(data) {
      // dispatch the action to mutate the state using registered coach data
      this.$store.dispatch('coaches/registerCoach', data)
      // Forward to the coaches page after registering as a coach
      // this.$router.push('/coaches') //or use the replace method which also pushes us away but we can't go back to the last page
      this.$router.replace('/coaches')
    }
  }
}
</script>
