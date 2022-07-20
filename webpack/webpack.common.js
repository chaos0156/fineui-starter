// webpack公共配置文件
// 开发环境和生产环境共用的配置，借助webpack-merge插件，可以merge到开发或生产环境，从而减少重复配置。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer'); //可以自动在样式中添加浏览器厂商前缀，避免手动处理样式兼容问题
const dirs = require('./dirs');

module.exports = {
    entry: {
        bundle: ['./src/index.ts'],
    },
    // 用于配置模块如何被解析
    resolve: {
        mainFields: ['module', 'main'],
        mainFiles: ['index'],
        //使用 import 引入其他模块时，如果不加上后缀扩展名且找不到对应的文件时，webpack 就会尝试根据 extensions 数组，
        //依次加上扩展名看看能不能匹配到一个文件，直到找到为止。如果找不到则会报错。
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 用于给一些模块起别名，不需要写冗长的路径。
        alias: {
            '@': dirs.SRC,
            '@app': dirs.SRC_MODULES_APP,
            '@base': dirs.SRC_MODULES_BASE,
            '@card': dirs.SRC_MODULES_CARD,
            '@core': dirs.SRC_MODULES_CORE,
            '@service': dirs.SRC_MODULES_SERVICE,
            '@types': dirs.SRC_MODULES_TYPES,
        },
    },
    // 在编译源代码时的一些模块统计信息。
    // 这些统计数据可以用来分析应用程序的依赖关系图，也可以用来优化编译速度。
    stats: {
        children: false,
        modules: false,
    },
    // 配置loader
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                include: [dirs.NODE_MODULES, dirs.SRC],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: dirs.BABEL_CONFIG,
                        },
                    },
                    {
                        loader: 'source-map-loader',
                        options: {
                            enforce: 'pre',
                        },
                    },
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [AutoPrefixer],
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            relativeUrls: false,
                        },
                    },
                ],
            },
        ],
    },
};
