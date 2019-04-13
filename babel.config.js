module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: ["last 2 versions", "ie >= 11"],
        modules: false,
        loose: true,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ],
}
