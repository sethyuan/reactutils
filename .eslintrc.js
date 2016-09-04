module.exports = {
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "parser": "babel-eslint",
  "plugins": [
    "babel",
    "react"
  ],
  "installedESLint": true,
  "extends": "eslint:recommended",
  "env": {
    "es6": true,
    "browser": true,
    "commonjs": true
  },
  "rules": {
    "arrow-spacing": 1,
    "babel/object-shorthand": 1,
    "babel/generator-star-spacing": [1, "after"],
    "curly": [1, "multi-line"],
    "eqeqeq": [2, "smart"],
    "no-loop-func": 2,
    "no-param-reassign": 1,
    "no-sequences": 2,
    "no-shadow": 1,
    "no-shadow-restricted-names": 2,
    "no-unused-expressions": 2,
    "no-use-before-define": [2, "nofunc"],
    "no-var": 2,
    "prefer-arrow-callback": 1,
    "prefer-spread": 1,
    "prefer-template": 1,
    "wrap-iife": [2, "inside"],
    "yoda": [2, "never"],
    "array-bracket-spacing": 1,
    "block-spacing": [1, "never"],
    "brace-style": [1, "1tbs", {"allowSingleLine": true}],
    "camelcase": [1, {"properties": "never"}],
    "comma-spacing": 1,
    "comma-style": 1,
    "computed-property-spacing": [1, "never"],
    "indent": [1, 2],
    "key-spacing": 1,
    "keyword-spacing": 1,
    "linebreak-style": [1, "unix"],
    "new-cap": 2,
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-lonely-if": 1,
    "no-spaced-func": 1,
    "no-trailing-spaces": 1,
    "no-unneeded-ternary": 1,
    "quotes": [1, "double"],
    "semi-spacing": 1,
    "semi": [2, "never"],
    "space-before-blocks": 1,
    "space-in-parens": [1, "never"],
    "space-unary-ops": 1,
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
    "react/jsx-space-before-closing": 0
  }
}
