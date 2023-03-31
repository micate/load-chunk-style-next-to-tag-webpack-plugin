const path = require('path');
const LoadChunkStyleNextToTagWebpackPlugin = require('../../src/index.js');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'example_dist'),
    filename: '[name].chunk.js',
  },
  plugins: [
    new LoadChunkStyleNextToTagWebpackPlugin({
      tag: 'link[href*=abc]',
      // tag: ['link[href*=abc]', 'link[href*=def]'],
    })
  ]
};
