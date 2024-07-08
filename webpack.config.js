module.exports = {
    // Other configurations...
    module: {
      rules: [
        // Other rules...
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/@mediapipe\/tasks-vision/,
        },
      ],
    },
  };
  