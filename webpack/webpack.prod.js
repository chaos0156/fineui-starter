const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  // 压缩JS文件
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const dirs = require('./dirs');
const common = require('./webpack.common.js');

module.exports = merge.smart(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    ie8: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    devtool: 'hidden-source-map',
    output: {
        path: dirs.DEST,
        filename: 'bundle.js',
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({}),
        new MiniCssExtractPlugin({
            path: dirs.DEST,
            filename: 'bundle.css',
        }),
        // webpack内部插件，banner字符串是版权声明
        new webpack.BannerPlugin({
            banner: `time: ${new Date().toLocaleString()}`,
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
