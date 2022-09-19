<template>
  <div>
    <TopBar id="slider" />
    <BeerList />
    <CreditsItem />
    <SideBar />
  </div>
</template>

<script>
function modalError(that) {
  const modalOptions = {
    title: 'Error ' + that.$store.state.error.code,
    size: 'sm',
    buttonSize: 'sm',
    okVariant: 'danger',
    headerClass: 'p-2 border-bottom-0',
    footerClass: 'p-2 border-top-0',
    centered: true,
  }
  window.console.warn(that.$store.state.error)
  if (document.querySelectorAll('.modal').length === 0) {
    that.$bvModal.msgBoxOk(that.$store.state.error.message, modalOptions)
  }
}
export default {
  data() {
    return {
      beers: [],
    };
  },
  mounted() {
    this.$store.commit("set_beers", JSON.parse(localStorage.getItem("beers")));
    this.$store.commit("set_wishlist", JSON.parse(localStorage.getItem("wishlist")));
    this.$store.commit("set_user", JSON.parse(localStorage.getItem("user")));
    this.$store.commit("set_meta", JSON.parse(localStorage.getItem("meta")));
    this.$store.commit("set_settings", JSON.parse(localStorage.getItem("settings")));
    // this.$store.commit('set_token', JSON.parse(localStorage.getItem('token')))
    if (!this.$store.state.user) {
      if (this.$store.state.access_token) {
        this.$store.dispatch("getUserInfo").then((r) => {
          if (r.ok) {
            localStorage.setItem("user", JSON.stringify(this.$store.state.user));
          }
          else {
            modalError(this);
          }
        });
      }
    }
    if (!this.$store.state.beers) {
      this.$store.commit("set_beers", []);
      if (this.$store.state.access_token) {
        this.$store.dispatch("getUserBeers").then((r) => {
          if (r.ok) {
            localStorage.setItem("beerstimestamp", new Date().toLocaleString());
            localStorage.setItem("beers", JSON.stringify(this.$store.state.beers));
            this.$store.commit("set_bshown", this.$store.state.beers?.length);
            localStorage.setItem("meta", JSON.stringify(this.$store.state.meta));
          }
          else {
            modalError(this);
          }
        });
      }
    }
    else
      this.$store.commit("set_bshown", this.$store.state.beers?.length);
    if (!this.$store.state.wishlist) {
      this.$store.commit("set_wishlist", []);
      if (this.$store.state.access_token) {
        this.$store.dispatch("getUserWishlist").then((r) => {
          if (r.ok) {
            localStorage.setItem("wishlist", JSON.stringify(this.$store.state.wishlist));
            this.$store.commit("set_wshown", this.$store.state.wishlist?.length);
          }
          else {
            modalError(this);
          }
        });
      }
    }
    else
      this.$store.commit("set_wshown", this.$store.state.wishlist?.length);
    this.$store.dispatch("filterList");
  },
}
</script>
