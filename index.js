class LoadChunkStyleNextToTagWebpackPlugin {
  name = 'load-chunk-style-next-to-tag';

  constructor({ tag }) {
    this.tag = tag;
  }

  apply(compiler) {
    const { name } = this;
    const pluginName = `${name}-webpack-plugin`;

    let query;
    if (this.tag) {
      const tags = Array.isArray(this.tag) ? this.tag.map((t) => (t ? t.trim() : '')).filter((t) => t) : [this.tag];
      query = tags.map((t) => `document.querySelector('${t}')`).join(' || ');
    }
    if (!query) {
      console.warn(pluginName, 'tag options is empty');
      return;
    }

    function replace(tagName) {
      return `
var attrName = '${name}';
${tagName}.setAttribute(attrName, chunkId);

var chunkLinks = document.querySelectorAll('link[' + attrName + ']');
var targetTag;
if (chunkLinks && chunkLinks.length) {
  targetTag = chunkLinks[chunkLinks.length - 1];
} else {
  try {
    targetTag = ${query};
  } catch(e) {
    console.error(attrName, 'query target tag failed', e);
  }
}
if (targetTag && targetTag.nextSibling) {
  targetTag.parentNode.insertBefore(${tagName}, targetTag.nextSibling);
} else {
  document.head.appendChild(${tagName});
}
`;
    }

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.mainTemplate.hooks.requireEnsure.tap(pluginName, (source) => {
        // webpack v4
        const keywordV4 = 'document.head.appendChild(linkTag);';
        if (source.contains(keywordV4)) {
          return source.replace(keywordV4, replace('linkTag'));
        }

        // webpack v5
        const keywordV5 = 'document.head.appendChild(link);';
        if (source.contains(keywordV5)) {
          return source.replace(keywordV5, replace('link'));
        }

        console.warn(pluginName, 'Keyword not found.');
        return source;
      });
    });
  }
}

module.exports = LoadChunkStyleNextToTagWebpackPlugin;
