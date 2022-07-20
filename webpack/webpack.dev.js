// 开发环境配置
const merge = require('webpack-merge'); // 合并不同的webpack配置文件，它允许连接数组并合并对象，而不是覆盖组合
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //打包CSS文件，从css文件中提取css代码到单独的文件中，对css代码进行代码压缩等
const HtmlWebpackPlugin = require('html-webpack-plugin'); //在webpack构建后生成html文件，同时把构建好入口js文件引入到生成的html文件中
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩CSS文件
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');  //加速TS类型检查，它会在打包时fork出一个进程并行进行检查，可以更好的利用多核cpu的能力，过程中几乎不影响webpack主进程，故可以优化速度。
// 引入路径常量
const dirs = require('./dirs');
// 合并公共环境配置
const common = require('./webpack.common.js');

module.exports = merge(common, {
    //配置sourcemap的，不会产生单独的sourcemap文件，代码出错时，可以显示行和列：
    devtool: 'eval-source-map',
    //入口文件，默认是./src/index.js
    entry: {},
    // bundle文件输出位置
    output: {
        path: dirs.DEST,
        filename: '[name].[contenthash].js',
    },
    // 开启本地服务器
    devServer: {
        open: true,
        //指定服务器自动打包哪个文件夹下的文件
        contentBase: dirs.CONTENT_BASE,
        port: 8080,
        liveReload: true,
    },
    // 插件
    plugins: [
        new ForkTsCheckerWebpackPlugin({}),
        new MiniCssExtractPlugin({
            path: dirs.DEST,
            filename: '[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: dirs.INDEX,
            chunks: ['bundle'],
            chunksSortMode: 'manual',
            nodeModules: dirs.NODE_MODULES,
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true,
                        },
                        normalizeUnicode: false,
                    },
                ],
            },
            canPrint: true,
        }),
    ],
});
