const config = {};

// Configurable paths
// Don't use leading or trailing slashes!
config.path = {
    src: 'src',
    dist: 'dist',
};

// Plugins preferences
config.plugins = {
    // Bumps the version number (and create a git commit and tag)
    bump: {
        packageFiles: ['package.json'],
    },

    // http://webpack.github.io/docs/configuration.html
    webpack: {
        entry: `${__dirname}/${config.path.src}/ReactBoard.js`,

        output: {
            filename: 'ReactBoard.js',
            library: 'ReactBoard',
            libraryTarget: 'umd',
        },

        externals: [{
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react',
            },
        }],

        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            }],
        },
    },
};

module.exports = config;
