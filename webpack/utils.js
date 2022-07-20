const path = require('path');

module.exports = {
    pathResolve: dirpath => path.resolve(__dirname, dirpath),
    pathJoin: dirpath => path.join(__dirname, dirpath),
};
