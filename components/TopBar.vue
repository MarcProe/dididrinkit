<template>
  <b-navbar class="mynav" fixed="top" sticky toggleable="lg">
    <b-form-input
      ref="search"
      v-model="text"
      class="w-50"
      debounce="500"
      type="text"
      placeholder="search"
      :formatter="sanitizeInput"
      @update="beerinput"
    />

    <div
      v-b-tooltip.hover
      title="checked beers / wishlist"
      class="text-center nav-text"
      style="font-size: large; white-space: nowrap; color: var(--color-primary)"
    >
      <span v-if="$store.state.usecheckins">{{ bshown }}</span>
      <span v-if="$store.state.usecheckins && $store.state.usewishlist"><br /></span>
      <span v-if="$store.state.usewishlist">{{ wshown }}</span>
    </div>
    <b-avatar :src="avatar" button @click="sync" />
    <IconGear v-b-toggle.sidebar style="max-height: 40px" />
  </b-navbar>
</template>
 
<script>
export default {
  data() {
    return {
      text: '',
    }
  },

  computed: {
    avatar() {
      return this.$store.state.user?.user_avatar
    },
    bshown() {
      return this.$store.state.bshown
    },
    wshown() {
      return this.$store.state.wshown
    },
  },

  methods: {
    beerinput(text) {
      this.$store.commit('set_text', text)
      this.$store.dispatch('filterList')
    },
    focusSearch() {
      this.$refs.search.focus()
    },
    sync() {
      localStorage.clear()
      localStorage.setItem('settings', JSON.stringify(this.$store.getters.get_settings))
      window.location.href = '/authredir'
    },
    sanitizeInput(value) {
      return value.toLowerCase().replaceAll('ä', 'a').replaceAll('ö', 'o').replaceAll('ü', 'u').replaceAll(' ', '-')
    },
  },
}
</script>
 