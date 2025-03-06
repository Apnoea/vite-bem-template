import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'

export default [{
  plugins: {
    sonarjs,
    unicorn
  },

  languageOptions: {
    globals: {},
    ecmaVersion: 2020,
    sourceType: 'module'
  },

  rules: {
    'comma-dangle': ['error', 'never'],

    'id-length': ['error', {
      exceptions: ['$']
    }],

    'import/no-named-as-default': 'off',
    indent: ['error', 2],
    'no-console': 'error',
    'no-unused-vars': 'off',
    'prefer-arrow-callback': 'off',
    semi: ['error', 'never'],

    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'never'
    }],

    quotes: ['error', 'single'],
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-unused-collection': 'off',
    'unicorn/prefer-dom-node-dataset': 'off'
  }
}]
