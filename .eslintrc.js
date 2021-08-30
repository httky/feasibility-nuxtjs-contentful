module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'comma-dangle': 'off',
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'no-trailing-spaces': 'off',
    'import/no-named-as-default': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-v-html': 'off', // TODO: XSSの可能性あるところは気を付ける
    'vue/attributes-order': 'off',
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'any',
          'normal': 'any',
          'component': 'any'
        }
      }
    ]
  }
}
