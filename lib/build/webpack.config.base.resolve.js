const path = require('path');

const resolve = p => path.resolve(process.cwd(), p);

module.exports = {
  alias: {
    components: resolve('src/components'),
    utils: resolve('src/utils'),
    constants: resolve('src/constants'),
    templates: resolve('src/templates'),
    styles: resolve('src/styles'),
    icons: resolve('src/icons')
  }
};
