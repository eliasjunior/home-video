module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    commonjs: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": ["warn"],
    "no-unused-vars": ["warn"],
    "no-debugger": ["warn"],
  },
};
