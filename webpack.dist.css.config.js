var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: [
        '.\\src\\style.js'
    ]    ,
    resolve: {
        modules: [
            path.join(__dirname, "./node_modules")
        ]
    },
    output: {
        path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'css.js',
        library: 'hrm-comps',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new ExtractTextPlugin(".\\hrm-comps.css")
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(path.normalize(__dirname ), "src")
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                include: [ path.resolve(path.normalize(__dirname ), ".\\src\\fonts")],
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "less-loader"]
                }),
                include: [path.resolve(path.normalize(__dirname ), ".\\src")],
            }
        ]
    }
};
