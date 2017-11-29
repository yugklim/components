var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: [
        '.\\src\\index.js'
    ]    ,
    resolve: {
        modules: [
            path.join(__dirname, "./node_modules")
        ]
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'hrm-comps.js',
        library: 'hrm-comps',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: '.\\src\\drawer', to: '..\\es\\drawer', copyUnmodified: true },
            { from: '.\\src\\period-range', to: '..\\es\\period-range', copyUnmodified: true },
            { from: '.\\src\\period-range-by-month', to: '..\\es\\period-range-by-month', copyUnmodified: true },
            { from: '.\\src\\styles', to: '..\\es\\styles', copyUnmodified: true },
            { from: '.\\src\\fonts', to: '..\\es\\fonts', copyUnmodified: true }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                include: [
                    path.resolve(path.normalize(__dirname )),
                    path.resolve(path.normalize(__dirname + '\\..'), "src")
                ],
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(path.normalize(__dirname ), "src")
                ],
                exclude: /node_modules/
            }
        ]
    }
};
