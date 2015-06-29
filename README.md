# React Board

React components for rendering the board for typical board games (like chess,
reversi, etc.).

# Install

```bash
npm install https://github.com/loonkwil/ReactBoard.git --save
```

# Usage

```javascript
import React from 'React';
import ReactBoard from 'ReactBoard';

export default class ChessApp extends React.Component {
    render() {
        return React.createElement(ReactBoard, {
            size: 8,
            values: [
                [ '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖' ],
                [ '♙', '♙', '♙', '♙',  '', '♙', '♙', '♙' ],
                [ ],
                [  '',  '',  '',  '', '♙', '',  '',  ''  ],
                [ ],
                [ ],
                [ '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟' ],
                [ '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜' ]
            ],
            highlight: [ [ 3, 5 ] ],
            clickHandler: ({ row, col }) => {
                // ...
            }
        });
    }
}
```

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

