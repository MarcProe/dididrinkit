<template>
  <div>
    <b-sidebar id="sidebar" class="sidebar" aria-label="Sidebar" no-header shadow @hidden="hidden">
      <template #footer="{ hide }">
        <div class="d-flex text-light align-items-center px-3 py-2 sidebarfooter">
          <b-container>
            <b-row>
              <b-col cols="10">
                <a href="https://untappd.com" target="_new">
                  <b-img src="@/static/pbu_40_yellow.png" fluid center />
                </a>
              </b-col>
              <b-col cols="2" class="text-right">
                <b-button size="sm" @click="hide">X</b-button>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </template>
      <div class="px-3 py-2">
        <b-form-checkbox
          id="checkbox-1"
          v-model="usewishlist"
          name="checkbox-1"
          size="lg"
          value="true"
          unchecked-value="false"
          >Show Wishlist</b-form-checkbox
        >
        <b-form-checkbox
          id="checkbox-2"
          v-model="usecheckins"
          name="checkbox-2"
          size="lg"
          value="true"
          unchecked-value="false"
          >Show Check-Ins</b-form-checkbox
        >
        <b-form-checkbox
          id="checkbox-3"
          v-model="showglobal"
          name="checkbox-3"
          size="lg"
          value="true"
          unchecked-value="false"
          >Show Global Rating</b-form-checkbox
        >
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    usewishlist: {
      get() {
        return this.$store.getters.get_usewishlist ?? true
      },
      set(val) {
        this.$store.commit('set_usewishlist', val)
        this.$store.dispatch('filterList')
      },
    },
    usecheckins: {
      get() {
        return this.$store.getters.get_usecheckins
      },
      set(val) {
        this.$store.commit('set_usecheckins', val)
        this.$store.dispatch('filterList')
      },
    },
    showglobal: {
      get() {
        return this.$store.getters.get_showglobal
      },
      set(val) {
        this.$store.commit('set_showglobal', val)
      },
    },
  },
  methods: {
    hidden() {
      localStorage.setItem('settings', JSON.stringify(this.$store.getters.get_settings))
    },
  },
}
</script>
