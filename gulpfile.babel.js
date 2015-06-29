'use strict';

import config from './gulpconfig.js';
import gulp from 'gulp';
import nopt from 'nopt'; // handle CLI arguments
import fs from 'fs';
import semver from 'semver';
import del from 'del';

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
import runSequence from 'run-sequence';

import gulpLoadPlugins from 'gulp-load-plugins';
const plugins = gulpLoadPlugins();

import webpack from 'webpack-stream';


// helpers
/**
 * Get the version number
 * @param {Array.<string>} packageFiles
 * @throws {Error}
 * @return {string}
 */
let getVersionNumberFromFile = function(packageFiles) {
    if (packageFiles.length === 0) {
        throw new Error(
            'Where are your package files (package.json, bower.json)?'
        );
    }

    let packageFile = packageFiles[0];
    let fileContent = fs.readFileSync(
        `${__dirname}/${packageFile}`, { encoding: 'utf-8' }
    );

    let pkg = JSON.parse(fileContent);
    if (!pkg.version) {
        throw new Error(
            `Your package file (${packageFile}) does not contain` +
                'any version number!'
        );
    }

    return pkg.version;
};

// parse CLI arguments with nopt
nopt.invalidHandler = function(key) {
    let msg = `Invalid "${key}" parameter!`;
    throw new Error(msg);
};

nopt.typeDefs.version = {
    type: 'version',
    validate(data, key, val) {
        val = (val + '').toLowerCase();

        // major: 1.0.0
        // minor: 0.1.0
        // patch: 0.0.2
        const shortHands = [ 'major', 'minor', 'patch' ];
        if (shortHands.indexOf(val) === -1 && !semver.valid(val)) {
            return false;
        }
        data[key] = val;
    }
};

let argv = nopt({ version: 'version' }, { v: '--version' }, process.argv, 1);

// set the default values
argv.version = argv.version || 'patch';

// Task for bumping the version number
// Usage: `gulp bump [--version <version>]`
gulp.task('bump', (cb) =>
    runSequence('bump-version-number', 'bump-commit-and-tag', cb)
);

gulp.task('bump-version-number', () => {
    let options = {};

    const shortHands = [ 'major', 'minor', 'patch' ];
    let key = (shortHands.indexOf(argv.version) !== -1) ? 'type' : 'version';
    options[key] = argv.version;

    let packageFiles = config.plugins.bump.packageFiles;
    return gulp.src(packageFiles).
        pipe(plugins.bump(options)).
        pipe(gulp.dest('./'));
});

gulp.task('bump-commit-and-tag', (cb) =>
    runSequence('bump-commit', 'bump-tag', cb)
);

gulp.task('bump-commit', () => {
    let packageFiles = config.plugins.bump.packageFiles;
    let message = `Release v${getVersionNumberFromFile(packageFiles)}`;

    let filesToCommit = [].concat(packageFiles, config.path.dist + '/**/*');
    return gulp.src(filesToCommit).pipe(plugins.git.commit(message));
});

gulp.task('bump-tag', (cb) => {
    let packageFiles = config.plugins.bump.packageFiles;
    let version = getVersionNumberFromFile(packageFiles);
    let message = `Release v${version}`;

    plugins.git.tag(version, message, cb);
});


// Task for testing and linting
// Usage: `gulp test` or `npm test`
gulp.task('test', [ 'lint' ]);

gulp.task('lint', [ 'jscs', 'jshint', 'jsonlint' ]);

gulp.task('jscs', () =>
    gulp.src(config.filesForAnalyze.js).pipe(plugins.jscs())
);

gulp.task('jshint', () =>
    gulp.src(config.filesForAnalyze.js).
        pipe(plugins.jshint()).
        pipe(plugins.jshint.reporter())
);

gulp.task('jsonlint', () =>
    gulp.src(config.filesForAnalyze.json).
        pipe(plugins.jsonlint()).
        pipe(plugins.jsonlint.reporter())
);


// Task for distributing
// Usage: `gulp`, `npm start`, `gulp dist` or `gulp build`
gulp.task('default', [ 'dist' ]);
gulp.task('build', [ 'dist' ])

gulp.task('dist', (cb) =>
    runSequence('cleanup', 'webpack-build', cb)
);

gulp.task('cleanup', (cb) =>
    del(config.path.dist, cb)
);

gulp.task('webpack-build', () =>
    gulp.src(config.plugins.webpack.entry).
        pipe(webpack(config.plugins.webpack)).
        pipe(gulp.dest(config.path.dist))
);


// Task for releasing
// Usage: `gulp release [--version <version>|-r <version>]`
gulp.task('release', (cb) =>
    runSequence('dist', 'bump', cb)
);
