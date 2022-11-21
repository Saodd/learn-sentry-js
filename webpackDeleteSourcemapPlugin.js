const fs = require('fs');
const path = require('path');

class DeleteSourceMapWebpackPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.done.tap('delete sourcemap files', (stats) => {
      let countMatchMapAssets = 0;
      const { outputPath } = stats.compilation.compiler;
      Object.keys(stats.compilation.assets)
        .filter((name) => /\.map$/.test(name))
        .forEach((name) => {
          countMatchMapAssets += 1;
          fs.unlinkSync(path.join(outputPath, name));
        });
      console.log(`⭐⭐⭐deleted map file: ${countMatchMapAssets} asset(s) processed`);
    });
  }
}

module.exports = DeleteSourceMapWebpackPlugin;
