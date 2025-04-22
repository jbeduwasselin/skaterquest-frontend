module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [],
  overrides: [
    {
      test: /\.js$/,
      presets: ["@babel/preset-flow"],
    },
  ],
};
