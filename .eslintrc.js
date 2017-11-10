module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "indent": ["error", 4],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
};
