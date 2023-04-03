class LoadChunkStyleNextToTagWebpackPlugin {
  name = 'load-chunk-style-next-to-tag';

  constructor({ group, tag }) {
    this.group = group;
    this.tag = tag;
  }

  getTagQueryCode() {
    const { tag } = this;

    if (tag) {
      const tags = Array.isArray(tag) ? tag.map((t) => (t ? t.trim() : '')).filter((t) => t) : [tag];
      return tags.map((t) => `document.querySelector('${t}')`).join(' || ');
    }
  }

  apply(compiler) {
    const { group, name } = this;
    const pluginName = `${name}-webpack-plugin`;

    const queryCode = this.getTagQueryCode();
    if (!queryCode) {
      console.warn(pluginName, 'tag options is empty');
      return;
    }

    function replace(tagName) {
      return `
var attrName = '${name}';
var groupName = '${group || ''}';
${tagName}.setAttribute(attrName, groupName || chunkId);

var chunkSelector = groupName ? ('link[' + attrName + '="' + groupName + '"]') : ('link[' + attrName + ']');
var chunkLinks = document.querySelectorAll(chunkSelector);

var targetTag;
if (chunkLinks && chunkLinks.length) {
  targetTag = chunkLinks[chunkLinks.length - 1];
} else {
  try {
    targetTag = ${queryCode};
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
        if (source && source.includes(keywordV4)) {
          return source.replace(keywordV4, replace('linkTag'));
        }

        // webpack v5
        const keywordV5 = 'document.head.appendChild(link);';
        if (source && source.includes(keywordV5)) {
          return source.replace(keywordV5, replace('link'));
        }

        console.warn(pluginName, 'Keyword not found.');
        return source;
      });
    });
  }
}

module.exports = LoadChunkStyleNextToTagWebpackPlugin;
