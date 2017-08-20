var webpack = require("webpack");
var path = require("path");
var drawerExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'drawer\\style': '.\\src\\drawer\\style\\index.js',
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
    plugins: [ new drawerExtractTextPlugin(".\\drawer\\style\\index.css") ],
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                include: [ path.resolve(path.normalize(__dirname ), "src\\fonts")],
            },
            {
                test: /\.less$/,
                use: drawerExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"]
                }),
                include: [path.resolve(path.normalize(__dirname ), "src\\drawer\\style")],
            }
        ]
    }
};
