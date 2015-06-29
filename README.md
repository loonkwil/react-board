# React Board

React components to render a board for board games (like chess, reversi, etc.).

# Contribute

## Gulp tasks

List all gulp task: `gulp --tasks`

### Test

Run the linting (jshint, jsonlint) scripts: `gulp lint`, `gulp test` or
`npm test`

### Compile

The `gulp build` (or just `gulp`).

### Release

For compiling the source code, bumping the version number and creating a
release commit, use the `gulp release [--version <version>|-r <version>]` task.

Version could be: major (1.0.0), minor (0.1.0), patch (0.0.2) (this one is the
default), or a specific version number like: 1.2.3 or 1.0.0-alpha

More about the Semantic Versioning: [http://semver.org](http://semver.org)
