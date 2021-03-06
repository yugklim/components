// This file configures the development web server
// which supports hot reloading and synchronized testing.
// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.period-range-development.config';

const bundler = webpack(config);

browserSync({
    server: {
        baseDir: './',

        middleware: [

            webpackDevMiddleware(bundler, {
                publicPath: config.output.publicPath,
                stats: { colors: true },
                noInfo: true
            }),

            webpackHotMiddleware(bundler)
        ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
        '*.html'
    ]
});
