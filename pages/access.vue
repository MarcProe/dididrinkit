<template>
  <div>
    <h1>Bitte warten</h1>
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