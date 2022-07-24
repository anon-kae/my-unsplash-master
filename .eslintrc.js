module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/base',
    'plugin:vuetify/base',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // allow curly brace on single-statement if/else/for/while/do block
    curly: ['error', 'multi-line'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow comma dangling
    'comma-dangle': 0,
    // allow extra semi-colon
    semi: 0,
    // avoid double quote
    quotes: ['error', 'single'],
    // allow max length
    'max-len': 'off',
    // allow console during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow throw error in try/catch
    'no-useless-catch': 'off',

    //* ** Vue ***/
    // disallow a line break before tag's closing brackets
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    // disallow a space before tag's closing brackets
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    // expect double quote in vue html
    'vue/html-quotes': ['error', 'double'],
    // require a line break before and after the contents of a multiline element.
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      },
    ],
    // require a line break before and after the contents of a singleline element
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
      },
    ],
    // required indent 2 space
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // enforce order of properties in components
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
    // require a spaces between expression and curly brackets
    'vue/mustache-interpolation-spacing': ['error', 'always'],
    // disallow spaces around equal signs in attribute.
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    // require default prop
    'vue/require-default-prop': 'error',
    // required indent 2 space in script tag
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: [],
      },
    ],

    //* ** Vuetify ***/
    'vuetify/no-deprecated-classes': 'error',
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
  },
}
