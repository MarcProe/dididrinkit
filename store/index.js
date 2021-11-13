export const state = () => ({
  access_token: null,
  beers: null,
  wishlist: null,
  filtered: [],
  text: '',
  user: null,
  error: null,
  meta: null,
  bshown: 0,
  wshown: 0,
})

export const mutations = {
  set_token(state, token) {
    state.access_token = token
  },
  set_beers(state, beers) {
    state.beers = beers
  },
  clear_beers(state) {
    state.beers = []
  },
  set_wishlist(state, wishlist) {
    state.wishlist = wishlist
  },
  set_filtered(state, filtered) {
    state.filtered = filtered
  },
  set_text(state, text) {
    state.text = text
  },
  set_user(state, user) {
    state.user = user
  },
  set_error(state, error) {
    state.error = error
  },
  set_meta(state, meta) {
    state.meta = meta
  },
  set_bshown(state, bshown) {
    state.bshown = bshown
  },
  set_wshown(state, wshown) {
    state.wshown = wshown
  },
}

export const getters = {
  get_access_token(state) {
    return state.access_token
  },
  get_beers(state) {
    return state.beers
  },
  get_wishlist(state) {
    return state.wishlist
  },
  get_filtered(state) {
    return state.filtered
  },
  get_text(state) {
    return state.text
  },
  get_user(state) {
    return state.user
  },
  get_error(state) {
    return state.error
  },
  get_meta(state) {
    return state.meta
  },
  get_bshown(state) {
    return state.bshown
  },
  get_wshown(state) {
    return state.wshown
  },
}

export const actions = {
  filterList({ commit, getters }) {
    const text = getters.get_text
    if (text.length > 1) {
      let filtered = getters.get_beers.filter((o) => o.slug.includes(text))

      commit('set_bshown', filtered.length)
      if (getters.get_wishlist) {
        const wfiltered = getters.get_wishlist.filter((o) =>
          o.slug.includes(text)
        )
        commit('set_wshown', filtered.length)
        filtered = wfiltered.concat(filtered)
      }
      commit('set_filtered', filtered)
    } else {
      commit('set_filtered', [])
    }
  },
  async getUserInfo({ commit, getters }) {
    const url = `https://api.untappd.com/v4/user/info/?access_token=${getters.get_access_token}&compact=true`
    let e = null
    const res = await this.$axios.get(url).catch((error) => {
      e = handle(error)
    })
    if (!e) {
      commit('set_user', res.data.response?.user)
      return { ok: true }
    } else {
      commit('set_error', e)
      return { ok: false }
    }
  },
  async getUserBeers({ commit, getters }) {
    return await getUserList(this.$axios, commit, getters, 'beers')
  },
  async getUserWishlist({ commit, getters }) {
    return await getUserList(this.$axios, commit, getters, 'wishlist')
  },
}

async function getUserList(axios, commit, getters, m = 'beers') {
  const url = `https://api.untappd.com/v4/user/${m}/?access_token=${getters.get_access_token}&limit=50`
  let beers = []
  let meta = null
  let count = 0
  let totalcount = 999999
  let br = 0
  let e = null
  while (count < totalcount && br < 5 && !e) {
    br++
    const res = await axios.get(`${url}&offset=${count}`).catch((error) => {
      e = handle(error)
    })
    if (!e) {
      count += res.data.response?.beers?.count
      totalcount = res.data.response?.total_count
      beers = beers.concat(res.data.response?.beers?.items)
      if (!meta && m === 'beers') {
        meta = res.data.response
        delete meta.beers
      }
    }
  }
  if (!e) {
    const liststore = `set_${m}`
    commit(liststore, filterdata(beers, m))
    if (m === 'beers') commit('set_meta', meta)
    return { ok: true }
  } else {
    commit('set_error', e)
    return { ok: false }
  }
}

function handle(error) {
  const e = {}
  if (error.response) {
    e.response = error.response
  } else if (error.request) {
    e.request = error.request
  } else {
    e.message = error.message
  }
  return e
}

function filterdata(data, m = 'beers') {
  const retval = []

  data.forEach((e) => {
    const el = {
      id: e?.beer?.bid,
      beer: e?.beer?.beer_name,
      label: e?.beer?.beer_label,
      slug: e?.beer?.beer_slug,
      brewery: e?.brewery?.brewery_name,
      score: e?.rating_score,
      list: m,
    }
    retval.push(el)
  })

  return retval
}
