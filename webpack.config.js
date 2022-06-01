export default {
  entry: {
    main: './src/js/main.js',
  },

  output: {
    filename: '[name].js',
    chunkFilename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
