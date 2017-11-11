const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const dev = {
    entry: './src/ReactBoard.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ReactBoard.js',
        library: 'ReactBoard',
        libraryTarget: 'umd',
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};

const prod = Object.assign({}, dev, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ReactBoard.min.js',
        library: 'ReactBoard',
        libraryTarget: 'umd',
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
});

module.exports = [dev, prod];
