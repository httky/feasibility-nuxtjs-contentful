// ローカル開発時は環境変数を参照できないので.envファイル経由で参照
require('dotenv').config({ path: `.env-${process.env.ENV || 'local'}` });

const ENV = process.env.ENV || 'local';
const BASE_ROUTER_PATH = process.env.BASE_ROUTER_PATH || '/';
const BASE_URL = ENV === 'stg' ? 'https://example.com' : 'https://production.com';
const CTF_CDA_ACCESS_TOKEN = process.env.CTF_CDA_ACCESS_TOKEN;
const CTF_CDA_PREVIEW_ACCESS_TOKEN = process.env.CTF_CDA_PREVIEW_ACCESS_TOKEN;
const sdkClient = require('./src/plugins/contentful').default;

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  srcDir: 'src/',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'proj',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'reset-css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-injection.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8' // storybook対策
  ],
  styleResources: {
    scss: [
      '~/assets/css/variables.scss',
      '~/assets/css/mixins.scss',
      '~/assets/css/global.scss',
      '~/assets/css/utilities.scss'
    ]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // dotenv module
  env: {
    ENV,
    BASE_URL,
    BASE_ROUTER_PATH,
    CTF_CDA_ACCESS_TOKEN,
    CTF_CDA_PREVIEW_ACCESS_TOKEN
  },

  router: {
    base: BASE_ROUTER_PATH
  },

  publicRuntimeConfig: {
    baseUrl: BASE_URL,
    basePath: BASE_ROUTER_PATH
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // corejs: 3
    transpile: [
      // contentfulのライブラリのビルドでES6（Template literal）が残る対策
      /(.+)(contentful\/dist\/es-modules\/)(.+)(\.js)$/
    ]
  },

  storybook: {
    addons: [
      '@storybook/addon-actions'
    ],
    // componentsディレクトリ以外でstoriesを生成したい時に定義
    stories: [],
    // port: 3003,
    // Storybookのグローバルパラメータを定義的な？
    parameters: {}
  },

  generate: {
    // stgでは除外しない
    exclude: ENV === 'stg' ? [] : [
      '/sample'
    ],
    async routes() {
      const readingPosts = await Promise.all([
        sdkClient.getEntries({
          content_type: 'readingPost'
        })
      ]).then(([posts]) => {
        const a = [];
        posts.items.forEach((post) => {
          a.push({
            route: `/article/${post.fields.slug}/`,
            payload: post
          });
        })
        return a;
      });

      return readingPosts;
    }
  }
}
