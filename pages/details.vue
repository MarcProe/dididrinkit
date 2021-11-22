<template>
  <div>
    <NuxtLink to="/">Home page</NuxtLink>
    {{ beer }}
    {{ $route.params.bid }}
  </div>
</template>

<script>
export default {
  async asyncData({ store, route }) {
    const b = await store.dispatch('get_beer', route.params.bid)
    return { beer: b }
  },
  data() {
    return {
      beer: null,
    }
  },
}
</script>
