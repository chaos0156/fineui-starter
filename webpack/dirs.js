const { pathResolve, pathJoin } = require('./utils');

module.exports = {
    NODE_MODULES: pathResolve('../node_modules'),
    DEST: pathResolve('../dist'),
    SRC: pathResolve('../src'),
    SRC_MODULES_APP: pathResolve('../src/modules/app'),
    SRC_MODULES_BASE: pathResolve('../src/modules/base'),
    SRC_MODULES_CARD: pathResolve('../src/modules/card'),
    SRC_MODULES_CORE: pathResolve('../src/modules/core'),
    SRC_MODULES_SERVICE: pathResolve('../src/modules/service'),
    SRC_MODULES_TYPES: pathResolve('../src/modules/types'),
    SRC_CORE: pathResolve('../src/core'),
    PRIVATE: pathResolve('../private'),
    INDEX: pathResolve('../template/index.html'),
    BABEL_CONFIG: pathResolve('../babel.config.js'),
    CONTENT_BASE: pathJoin('..'),
};
