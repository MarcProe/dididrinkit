<template>
  <b-list-group id="beerlist">
    <b-container v-for="b in $store.state.filtered" :key="b.id" fluid>
      <b-row>
        <b-col cols="3">
          <b-img-lazy
            v-if="b.label"
            v-b-tooltip.hover
            class="mb-1"
            fluid
            rounded
            style="max-height: 100px"
            :alt="b.beer"
            :src="b.label"
            :title="b.slug"
          />
        </b-col>
        <b-col>
          <a :href="`https://untappd.com/b/${b.slug}/${b.id}`">
            <b-row class="" style="font-size: x-large">
              {{ b.beer }}
            </b-row>
          </a>
          <b-row class="font-weight-bold">{{ b.brewery }} </b-row>
        </b-col>
        <b-col
          class="text-center font-weight-bold"
          cols="2"
          style="font-size: xx-large"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-if="b.list === 'beers'" v-html="computeRating(b.score)" />
          <span v-else v-b-tooltip.hover title="Wunschliste">WL</span>
        </b-col>
      </b-row>
    </b-container>
  </b-list-group>
</template>

<script>
export default {
  data() {
    return {
      fracs: {
        0: '<small><b>0</b></small>',
        0.25: '&frac14;',
        0.5: '&half;',
        0.75: '&frac34;',
      },
    }
  },

  methods: {
    computeRating(r) {
      if (r) {
        return `${Math.floor(r)}<sup>${this.fracs[r % 1]}</sup>`
      } else {
        return ''
      }
    },
  },
}
</script>