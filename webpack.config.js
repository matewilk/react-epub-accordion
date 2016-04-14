var path = require('path');

module.exports = {
    entry: './app/components/Main.js',
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./app/styles")]
    }
}
