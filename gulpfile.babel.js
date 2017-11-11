import gulp from 'gulp';
import nopt from 'nopt'; // handle CLI arguments
import fs from 'fs';
import semver from 'semver';

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
import runSequence from 'run-sequence';

import gulpLoadPlugins from 'gulp-load-plugins';

import config from './gulpconfig';

const plugins = gulpLoadPlugins();

// helpers
/**
 * Get the version number
 * @param {Array.<string>} packageFiles
 * @throws {Error}
 * @return {string}
 */
const getVersionNumberFromFile = function (packageFiles) {
    if (packageFiles.length === 0) {
        throw new Error('Where are your package files (package.json, bower.json)?');
    }

    const packageFile = packageFiles[0];
    const fileContent = fs.readFileSync(`${__dirname}/${packageFile}`, { encoding: 'utf-8' });

    const pkg = JSON.parse(fileContent);
    if (!pkg.version) {
        throw new Error(`Your package file (${packageFile}) does not contain` +
            'any version number!');
    }

    return pkg.version;
};

// parse CLI arguments with nopt
nopt.invalidHandler = function (key) {
    const msg = `Invalid "${key}" parameter!`;
    throw new Error(msg);
};

nopt.typeDefs.version = {
    type: 'version',
    validate(data, key, val) {
        val = `${val.toLowerCase()}`;

        // major: 1.0.0
        // minor: 0.1.0
        // patch: 0.0.2
        const shortHands = ['major', 'minor', 'patch'];
        if (shortHands.indexOf(val) === -1 && !semver.valid(val)) {
            return false;
        }
        data[key] = val;

        return true;
    },
};

const argv = nopt({ version: 'version' }, { v: '--version' }, process.argv, 1);

// set the default values
argv.version = argv.version || 'patch';

// Task for bumping the version number
// Usage: `gulp bump [--version <version>]`
gulp.task('bump', cb => runSequence('bump-version-number', 'bump-commit-and-tag', cb));

gulp.task('bump-version-number', () => {
    const options = {};

    const shortHands = ['major', 'minor', 'patch'];
    const key = (shortHands.indexOf(argv.version) !== -1) ? 'type' : 'version';
    options[key] = argv.version;

    const { packageFiles } = config.plugins.bump;
    return gulp.src(packageFiles)
        .pipe(plugins.bump(options))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-commit-and-tag', cb => runSequence('bump-commit', 'bump-tag', cb));

gulp.task('bump-commit', () => {
    const { packageFiles } = config.plugins.bump;
    const message = `Release v${getVersionNumberFromFile(packageFiles)}`;

    const filesToCommit = [].concat(packageFiles, `${config.path.dist}/**/*`);
    return gulp.src(filesToCommit).pipe(plugins.git.commit(message));
});

gulp.task('bump-tag', (cb) => {
    const { packageFiles } = config.plugins.bump;
    const version = getVersionNumberFromFile(packageFiles);
    const message = `Release v${version}`;

    plugins.git.tag(`v${version}`, message, cb);
});
