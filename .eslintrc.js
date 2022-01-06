module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "linebreak-style": 0,
    "global-require": 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  "overrides": [
    {
      "files": ["*.vue","*.js"],
      "rules": {
        "func-names": "off",
        "no-param-reassign": "off",
        "vue/require-default-prop": "off",
        "no-plusplus": "off",
        "no-new": "off",
        "import/prefer-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "vue/attribute-hyphenation": 0,
        "vue/html-closing-bracket-newline": 0,
        "vue/no-v-html": "off",
        "prefer-destructuring": ["error", {
          "array": false,
        }]
      }
    }
  ]
}


