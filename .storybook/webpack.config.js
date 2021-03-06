// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
var path = require("path");

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
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
                path.resolve(path.normalize(__dirname ), "..\\src\\period-range\\style"),
                path.resolve(path.normalize(__dirname ), "..\\src\\drawer\\style")
            ],
        }
    ],
  },
};
