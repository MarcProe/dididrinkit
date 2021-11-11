<template>
  <div>
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
        <b-col cols="3" class="text-center" style="font-size: x-large">{{
          shown
        }}</b-col>
        <b-col cols="3">
          <b-avatar
            :src="
              $store.state.user && $store.state.user.user_avatar
                ? $store.state.user.user_avatar
                : ''
            "
            fluid
            button
            @click="sync"
          >
          </b-avatar
        ></b-col>
      </b-row>
    </b-container>
    <BeerList :beers="beers" />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      beers: [],
      meta: {},
      shown: 0,
      text: '',
    }
  },
  mounted() {
    this.focusSearch()

    this.$store.commit('set_beers', JSON.parse(localStorage.getItem('beers')))
    this.$store.commit('set_user', JSON.parse(localStorage.getItem('user')))
    this.$store.commit('set_meta', JSON.parse(localStorage.getItem('meta')))

    if (!this.$store.state.user) {
      if (this.$store.state.access_token) {
        this.getUserInfo().then((r) => {
          if (r.ok) {
            localStorage.setItem('user', JSON.stringify(this.$store.state.user))
          }
        })
      }

      if (!this.$store.state.beers) {
        this.$store.commit('set_beers', [])
        // load if we have a token, as the stored beers might be old data
        if (this.$store.state.access_token) {
          this.getUserBeers().then((r) => {
            if (r.ok) {
              this.shown = this.$store.state.beers.length
              localStorage.setItem(
                'beerstimestamp',
                new Date().toLocaleString()
              )
              localStorage.setItem(
                'beers',
                JSON.stringify(this.$store.state.beers)
              )
              localStorage.setItem('meta', JSON.stringify(this.meta))
            }
          })
        }
      }
    } else this.shown = this.$store.state.beers.length
  },
  methods: {
    sanitizeInput(value) {
      return value
        .toLowerCase()
        .replaceAll('ä', 'a')
        .replaceAll('ö', 'o')
        .replaceAll('ü', 'u')
    },
    beerinput(text) {
      if (text.length > 1) {
        this.beers = _.filter(this.$store.state.beers, (o) => {
          return o.slug.includes(text)
        })
        this.shown = this.beers.length
      } else {
        this.beers = []
        this.shown = this.$store.state.beers.length
      }
    },
    focusSearch() {
      this.$refs.search.focus()
    },
    sync() {
      localStorage.removeItem('beers')
      localStorage.removeItem('user')
      localStorage.removeItem('meta')
      window.location.href = '/authredir'
    },
    async getUserInfo(token) {
      const res = await this.$store.dispatch('getUserInfo')
      return res
    },
    async getUserBeers(token) {
      const res = await this.$store.dispatch('getUserBeers')
      return res
    },
  },
}
</script>
