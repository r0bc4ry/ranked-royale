const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: {
        auth: './client/js/auth.js',
        index: './client/js/index.js',
        play: './client/js/play.js',
        profile: './client/js/profile.js',
        vendor: './client/js/vendor.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                // Fallback to style-loader in development
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: '../fonts'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['./public/css/*.*', './public/fonts/*.*', './public/js/*.*']),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output both options are optional
            filename: '../css/[name].css',
            chunkFilename: '../css/[id].css'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/js')
    }
};
