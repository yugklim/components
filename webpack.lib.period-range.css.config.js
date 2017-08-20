var webpack = require("webpack");
var path = require("path");
var periodRangeExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'period-range\\style': '.\\src\\period-range\\style\\index.js',
    },
    output: {
        path: `${__dirname}/lib`,
        publicPath: '/',
        filename: '[name]/css.js',
        library: ['hrm-comps', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [ new periodRangeExtractTextPlugin(".\\period-range\\style\\index.css") ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                include: [ path.resolve(path.normalize(__dirname ), "src\\fonts")],
            },
            {
                test: /\.less$/,
                use: periodRangeExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"]
                }),
                include: [path.resolve(path.normalize(__dirname ), "src\\period-range\\style")],
            }
        ]
    }
};
