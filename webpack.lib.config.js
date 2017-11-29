var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "source-map",
    entry: {
        'drawer': '.\\src\\drawer\\index.js',
        'period-range': '.\\src\\period-range\\index.js',
        'period-range-by-month': '.\\src\\period-range-by-month\\index.js'
    },
    resolve: {
        modules: [
            path.join(__dirname, "./node_modules")
        ]
    },
    output: {
        path: `${__dirname}/lib`,
        publicPath: '/',
        filename: '[name]/index.js',
        library: ['hrm-comps', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
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
