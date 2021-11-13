<template>
  <div>
    <TopBar />
    <BeerList />
    <Credits />
  </div>
</template>

<script>
import { get } from 'lodash-es'

export default {
  data() {
    return {
      beers: [],
    }
  },

  mounted() {
    this.$store.commit('set_beers', JSON.parse(localStorage.getItem('beers')))
    this.$store.commit(
      'set_wishlist',
      JSON.parse(localStorage.getItem('wishlist'))
    )
    this.$store.commit('set_user', JSON.parse(localStorage.getItem('user')))
    this.$store.commit('set_meta', JSON.parse(localStorage.getItem('meta')))

    if (!this.$store.state.user) {
      if (this.$store.state.access_token) {
        this.$store.dispatch('getUserInfo').then((r) => {
          if (r.ok) {
            localStorage.setItem('user', JSON.stringify(this.$store.state.user))
          } else {
            window.console.log(this.$store.state.error)
          }
        })
      }
    }

    if (!this.$store.state.beers) {
      this.$store.commit('set_beers', [])
      if (this.$store.state.access_token) {
        this.$store.dispatch('getUserBeers').then((r) => {
          if (r.ok) {
            localStorage.setItem('beerstimestamp', new Date().toLocaleString())
            localStorage.setItem(
              'beers',
              JSON.stringify(this.$store.state.beers)
            )
            localStorage.setItem('meta', JSON.stringify(this.$store.state.meta))
          } else {
            window.console.log(this.$store.state.error)
          }
        })
      }
    } else
      this.$store.commit('set_bshown', get(this.$store, 'state.beers.length'))

    if (!this.$store.state.wishlist) {
      this.$store.commit('set_wishlist', [])
      if (this.$store.state.access_token) {
        this.$store.dispatch('getUserWishlist').then((r) => {
          if (r.ok) {
            localStorage.setItem(
              'wishlist',
              JSON.stringify(this.$store.state.wishlist)
            )
          } else {
            window.console.log(this.$store.state.error)
          }
        })
      }
    } else
      this.$store.commit(
        'set_wshown',
        get(this.$store, 'state.wishlist.length')
      )
  },
}
</script>
