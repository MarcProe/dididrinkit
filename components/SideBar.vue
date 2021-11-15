<template>
  <div>
    <b-sidebar
      id="sidebar-footer"
      aria-label="Sidebar with custom footer"
      no-header
      shadow
    >
      <template #footer="{ hide }">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <b-row>
            <b-col cols="10">
              <a href="https://untappd.com" target="_new">
                <b-img src="@/static/pbu_40_black.png" fluid center />
              </a>
            </b-col>
            <b-col cols="2" class="text-right">
              <b-button size="sm" @click="hide">X</b-button>
            </b-col>
          </b-row>
        </div>
      </template>
      <div class="px-3 py-2">
        <p>Cooles Menü, ohne aktuell besonderen Sinn. Kommt noch.</p>
        <b-img
          src="https://static.wikia.nocookie.net/desimpsons/images/6/6c/Barney.png"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {}
</script>
