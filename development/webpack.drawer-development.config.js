var webpack = require("webpack");
var path = require("path");

module.exports = {
    devtool: "source-map",
    entry: [
        'webpack-hot-middleware/client?reload=true',
        "babel-polyfill",
        '.\\drawer-index.js',
        '..\\src\\drawer\\style\\index.js',
    ],
    resolve: {
        modules: [
            path.join(__dirname, "./node_modules"),
            path.join(__dirname, "../src/node_modules")
        ]
    },
    output: {
        path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'index.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     include: [
            //         path.resolve(path.normalize(__dirname )),
            //         path.resolve(path.normalize(__dirname + '\\..'), "src")
            //     ],
            //     use: [
            //         {
            //             loader: 'eslint-loader'
            //         }
            //     ]
            // },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(path.normalize(__dirname )),
                    path.resolve(path.normalize(__dirname + '\\..'), "src")
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
                include: [ path.resolve(path.normalize(__dirname ), "..\\src\\fonts")],
            },
            {
                test: /\.less$/,
                loaders: ['style-loader',  'css-loader', 'less-loader'],
                include: [
                    path.resolve(path.normalize(__dirname ), "..\\src\\styles"),
                    path.resolve(path.normalize(__dirname ), "..\\src\\drawer\\style")
                ],
            }
        ]
    }
};
