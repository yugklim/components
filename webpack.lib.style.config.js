var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        'styles': '.\\src\\style.js',
    },
    resolve: {
        modules: [
            path.join(__dirname, "./node_modules")
        ]
    },
    output: {
        path: `${__dirname}/lib`,
        publicPath: '/',
        filename: '[name]/css.js',
        library: ['hrm-comps', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new ExtractTextPlugin(".\\styles\\main.css"),
        new CopyWebpackPlugin([
            { from: '.\\src\\drawer\\style\\index.less', to: '.\\drawer\\style\\index.less' },
            { from: '.\\src\\drawer\\style\\index.js', to: '.\\drawer\\style\\index.js' },
            { from: '.\\src\\period-range\\style\\index.less', to: '.\\period-range\\style\\index.less' },
            { from: '.\\src\\period-range\\style\\index.js', to: '.\\period-range\\style\\index.js' },
            { from: '.\\src\\period-range-by-month\\style\\index.less', to: '.\\period-range-by-month\\style\\index.less' },
            { from: '.\\src\\period-range-by-month\\style\\index.js', to: '.\\period-range-by-month\\style\\index.js' },
            { from: '.\\src\\styles', to: '.\\styles' },
            { from: '.\\src\\fonts', to: '.\\fonts' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                include: [ path.resolve(path.normalize(__dirname ), "src\\fonts")],
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"]
                }),
                include: [path.resolve(path.normalize(__dirname ), "src\\styles")],
            }
        ]
    }
};
