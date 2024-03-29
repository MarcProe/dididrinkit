require('dotenv').config()
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DidIDrinkIt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/static/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://nuxtjs.org/tutorials/going-dark-with-nuxtjs-color-mode/
    '@nuxtjs/color-mode',
  ],

  bootstrapVue: {
    // https://stackoverflow.com/a/62749630/5858875
    // icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      name: 'Did I Drink It?',
      description: 'Check if you already drank a beer, fast.',
    },
    manifest: {
      lang: 'en',
      name: 'Did I Drink It?',
      short_name: 'DidIDrinkIt?',
      description: 'Check if you already drank a beer, fast.',
      orientation: 'portrait',
      related_applications: [
        {
          platform: 'webapp',
          url: 'https://untappd.com',
        },
      ],
      background_color: '#0d2538',
      theme_color: '#0d2538',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // hack via https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-640277825
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
      }
    },
    babel: {
      compact: true,
    },
  },

  serverMiddleware: ['~/serverMiddleware/auth', '~/serverMiddleware/authredir'],

  server: {
    host: '0',
    port: process.env.PORT,
  },
}
