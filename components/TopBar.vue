<template>
  <b-navbar class="mynav" fixed="top" sticky toggleable="lg" type="dark">
    <b-row>
      <b-col cols="6">
        <b-form-input
          ref="search"
          v-model="text"
          debounce="500"
          type="text"
          placeholder="search"
          :formatter="sanitizeInput"
          @update="beerinput"
        />
      </b-col>
      <b-col
        v-b-tooltip.hover
        title="checked beers / wishlist"
        cols="2"
        class="text-center"
        style="font-size: x-large"
        >{{ bshown }}/{{ wshown }}</b-col
      >
      <b-col cols="2">
        <b-avatar :src="avatar" fluid button @click="sync" />
      </b-col>
      <b-col cols="2">
        <IconGear v-b-toggle.sidebar-footer flex style="max-height: 40px" />
      </b-col>
    </b-row>
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
      window.location.href = '/authredir'
    },
    sanitizeInput(value) {
      return value
        .toLowerCase()
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('ü', 'u')
        .replaceAll(' ', '-')
    },
  },
}
</script>
 