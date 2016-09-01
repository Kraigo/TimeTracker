module.exports = {
    context: __dirname + '/public',
    entry: './app.js',
    output: {
        path: __dirname + '/public',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            // SASS one omitted
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};