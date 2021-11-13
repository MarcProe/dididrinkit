import { filter, get } from 'lodash-es'

export const state = () => ({
  access_token: null,
  beers: null,
  filtered: [],
  text: '',
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
}

export const getters = {
  get_access_token(state) {
    return state.access_token
  },
  get_beers(state) {
    return state.beers
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
  get_shown(state) {
    return get(state, 'filtered.length')
  },
}

export const actions = {
  filterList({ commit, getters }) {
    const text = getters.get_text
    if (text.length > 1) {
      const filtered = filter(getters.get_beers, (o) => {
        return o.slug.includes(text)
      })
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
      commit('set_user', get(res, 'data.response.user'))
      return { ok: true }
    } else {
      commit('set_error', e)
      return { ok: false }
    }
  },
  async getUserBeers({ commit, getters }) {
    const beers = await getUserList(this, commit, getters, 'beers')
    const wishlist = await getUserList(this, commit, getters, 'wishlist')
    const ret =
      Array.isArray(beers) && Array.isArray(wishlist)
        ? beers.concat(wishlist)
        : []
    return ret
  },
}

async function getUserList(that, commit, getters, m = 'beers') {
  const url = `https://api.untappd.com/v4/user/${m}/?access_token=${getters.get_access_token}&limit=50`
  let beers = []
  let meta = null
  let count = 0
  let totalcount = 999999
  let br = 0
  let e = null
  while (count < totalcount && br < 5 && !e) {
    br++
    const res = await that.$axios
      .get(`${url}&offset=${count}`)
      .catch((error) => {
        e = handle(error)
      })
    if (!e) {
      count += get(res, 'data.response.beers.count')
      totalcount = get(res, 'data.response.total_count')
      beers = beers.concat(get(res, 'data.response.beers.items'))
      if (!meta) {
        meta = res.data.response
        delete meta.beers
      }
    }
  }
  if (!e) {
    const liststore = `set_${m}`
    commit(liststore, filterdata(beers, m))
    commit('set_meta', meta)
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
      id: e.first_checkin_id,
      beer: get(e, 'beer.beer_name'),
      label: get(e, 'beer.beer_label'),
      slug: get(e, 'beer.beer_slug'),
      brewery: get(e, 'brewery.brewery_name'),
      score: e.rating_score,
      method: m,
    }
    retval.push(el)
  })

  return retval
}
