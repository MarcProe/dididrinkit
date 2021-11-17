<template>
  <div>
    <b-sidebar
      id="sidebar"
      class="sidebar"
      aria-label="Sidebar"
      no-header
      shadow
    >
      <template #footer="{ hide }">
        <div
          class="d-flex text-light align-items-center px-3 py-2 sidebarfooter"
        >
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
          @input="toggle_usewishlist"
          >Show Wishlist</b-form-checkbox
        >
        <b-form-checkbox
          id="checkbox-2"
          v-model="usecheckins"
          name="checkbox-2"
          size="lg"
          value="true"
          unchecked-value="false"
          @input="toggle_usecheckins"
          >Show Check-Ins</b-form-checkbox
        >
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usewishlist: true,
      usecheckins: true,
    }
  },
  methods: {
    toggle_usewishlist(val) {
      this.$store.commit('set_usewishlist', val)
      this.$store.dispatch('filterList')
    },
    toggle_usecheckins(val) {
      this.$store.commit('set_usecheckins', val)
      this.$store.dispatch('filterList')
    },
  },
}
</script>
