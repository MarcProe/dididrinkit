<template>
  <div>
    <div class="d-flex justify-content-center mb-3">
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('set_token', this.$route.query.access)
    this.$router.push('/')
  },
}
</script>