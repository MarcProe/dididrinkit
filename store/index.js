export const state = () => ({
  access_token: null,
  beers: null,
  user: null,
  error: null,
  meta: null,
})

export const mutations = {
  set_token(state, token) {
    state.access_token = token
  },
  set_beers(state, beers) {
    state.beers = beers
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
}

export const getters = {
  get_access_token(state) {
    return state.access_token
  },
  get_beers(state) {
    return state.beers
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
}

export const actions = {
  async getUserInfo({ commit, getters }) {
    const url = `https://api.untappd.com/v4/user/info/?access_token=${getters.get_access_token}&compact=true`
    let e = null
    const res = await this.$axios.get(url).catch((error) => {
      e = handle(error)
    })
    if (!e) {
      commit('set_user', res.data.response.user)
      return { ok: true }
    } else {
      commit('set_error', e)
      return { ok: false }
    }
  },
  async getUserBeers({ commit, getters }) {
    const url = `https://api.untappd.com/v4/user/beers/?access_token=${getters.get_access_token}&limit=50`
    let beers = []
    let meta = null
    let count = 0
    let totalcount = 999999
    let br = 0
    let e = null
    while (count < totalcount && br < 5 && !e) {
      br++
      const res = await this.$axios
        .get(`${url}&offset=${count}`)
        .catch((error) => {
          e = handle(error)
        })
      if (!e) {
        count += res.data.response.beers.count
        totalcount = res.data.response.total_count
        beers = beers.concat(res.data.response.beers.items)
        if (!meta) {
          meta = res.data.response
          delete meta.beers
        }
      }
    }
    if (!e) {
      commit('set_beers', beers)
      commit('set_meta', meta)
      return { ok: true }
    } else {
      commit('set_error', e)
      return { ok: false }
    }
  },
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
