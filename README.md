[![npm][npm]][npm-url]
![npm](https://img.shields.io/npm/dw/load-chunk-style-next-to-tag-webpack-plugin.svg)

<div align="center">
  <h1>LoadChunkStyleNextToTag Webpack Plugin</h1>
  <p>Plugin that make sure chunk style is load next to your main css file, avoid affecting style priority.</p>
</div>

<h2 align="center">Install</h2>

```bash
  npm i --save-dev load-chunk-style-next-to-tag-webpack-plugin
```

```bash
  yarn add --dev load-chunk-style-next-to-tag-webpack-plugin
```


This is a [webpack](http://webpack.js.org/) plugin that make sure chunk style is load next to your main css file, avoid affecting style priority.

<h2 align="center">Usage</h2>

Just add the plugin to your `webpack` config as follows:

**webpack.config.js**
```js
const LoadChunkStyleNextToTagWebpackPlugin = require('load-chunk-style-next-to-tag-webpack-plugin')

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new LoadChunkStyleNextToTagWebpackPlugin({
      tag: 'link[href*=abc]'
    })
  ]
}
```

Webpack chain config:
```js
module.exports = ({ context, onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {

    config.plugin('load-chunk-style-next-to').use(LoadChunkStyleNextToTagWebpackPlugin, [{
      tag: 'link[href*=abc]',
    }]);

  });
};
```

<h2 align="center">Options</h2>

Allowed values are as follows:

|   Name    |Type|  Default   | Description                                             |
|:---------:|:--:|:----------:|:--------------------------------------------------------|
| **`tag`** |`{String|String[]}` |``| The html tag css selector that need load style next to. If more than one is provided, the first found element takes precedence. |

Here's an example webpack config illustrating how to use these options

**webpack.config.js**
```js
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new LoadChunkStyleNextToTagWebpackPlugin({
      tag: 'link[href*=abc]'
    })
  ]
}
```

[npm]: https://img.shields.io/npm/v/load-chunk-style-next-to-tag-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/load-chunk-style-next-to-tag-webpack-plugin
