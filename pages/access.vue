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
    sleep(3000)
    this.$router.push('/')
  },
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
</script>
