<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <b-form-input
          ref="search"
          v-model="text"
          placeholder="Suchbegriff"
          :formatter="sanitizeInput"
          @input="beerinput"
        />
      </b-col>
      <b-col
        v-b-tooltip.hover
        title="checked beers / wishlist"
        cols="3"
        class="text-center"
        style="font-size: x-large"
      >
        {{ bshown }}/{{ wshown }}
      </b-col>
      <b-col cols="3">
        <b-avatar :src="avatar" fluid button @click="sync" />
      </b-col>
    </b-row>
  </b-container>
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
      localStorage.removeItem('beers')
      localStorage.removeItem('wishlist')
      localStorage.removeItem('user')
      localStorage.removeItem('meta')
      window.location.href = '/authredir'
    },
    sanitizeInput(value) {
      return value
        .toLowerCase()
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('ü', 'u')
    },
  },
}
</script>
 