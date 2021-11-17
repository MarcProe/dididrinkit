<template>
  <b-alert
    :show="dismissCountDown"
    fade
    variant="dark"
    class="position-fixed fixed-bottom m-0 rounded-0"
    style="z-index: 2000"
    @dismiss-count-down="countDownChanged"
  >
    <a href="https://untappd.com" target="_new">
      <b-img src="@/static/pbu_40_black.png" fluid center />
    </a>
  </b-alert>
</template>

<script>
export default {
  data() {
    return {
      dismissSecs: 2,
      dismissCountDown: 0,
    }
  },

  mounted() {
    this.dismissCountDown = this.dismissSecs
  },

  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  },
}
</script>
