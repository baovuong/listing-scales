var path = require('path');

module.exports = {
    entry: ['./src/main/js/app.js', './src/main/js/musicalScale.js'],
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ],
        
    },
    resolve: {
        // modules: [path.resolve(__dirname, "./src/main/js"), "node_modules"],
        extensions: ['', '.js', '.jsx']
    }
};