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
};

module.exports = config;
