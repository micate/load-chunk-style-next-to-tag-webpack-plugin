[![npm][npm]][npm-url]
![npm](https://img.shields.io/npm/dw/load-chunk-style-next-to-tag-webpack-plugin.svg)

<div align="center">
  <h1>LoadChunkStyleNextToTag Webpack Plugin</h1>
  <p>This is a [webpack](http://webpack.js.org/) plugin that make sure chunk style is load next to your main css file, avoid affecting style priority.</p>
</div>

<h2 align="center">Example</h2>

```html
<html>
<head>
  <link href="/path/to/your/main.css" />
  <!-- make sure chunk style is load next to your main css file -->
  <link href="/path/to/your/chunk-1.css" load-chunk-style-next-to-tag="group" />
  <link href="/path/to/your/chunk-2.css" load-chunk-style-next-to-tag="group" />
  <!-- avoid affecting style priority -->

  <link href="/path/to/your/other.css" />
</head>
</html>
```

<h2 align="center">Install</h2>

```bash
  npm i --save-dev load-chunk-style-next-to-tag-webpack-plugin
```

```bash
  yarn add --dev load-chunk-style-next-to-tag-webpack-plugin
```

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
      group: 'abc',
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
      group: 'abc',
      tag: 'link[href*=abc]',
    }]);

  });
};
```

<h2 align="center">Options</h2>

Allowed values are as follows:

|    Name     |         Type         |  Default   | Description                                                                                                                     |
|:-----------:|:--------------------:|:----------:|:--------------------------------------------------------------------------------------------------------------------------------|
| **`group`** | `{String}` |``| Grouping in multiple configurations on the same page.                                                                           |
|  **`tag`**  | `{String\|String[]}` |``| The html tag css selector that need load style next to. If more than one is provided, the first found element takes precedence. |

[npm]: https://img.shields.io/npm/v/load-chunk-style-next-to-tag-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/load-chunk-style-next-to-tag-webpack-plugin
