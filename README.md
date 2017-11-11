# React Board

[React](https://facebook.github.io/react) components for rendering the board
for typical board games (like chess, reversi, etc.).

Example usage: https://github.com/loonkwil/reversi

# Install

```bash
npm install react-board --save
```

# Usage

```javascript
import React from 'react';
import ReactBoard from 'react-board';

export default class ChessApp extends React.Component {
    constructor(props) {
        super(props);

        // The this.board[0][0] will be in the bottom left corner and
        // the this.board[7][0] in the bottom right
        this.board = [
            [ '♖', '♙', ' ', ' ', ' ', ' ', '♟', '♜' ],
            [ '♘', '♙', ' ', ' ', ' ', ' ', '♟', '♞' ],
            [ '♗', '♙', ' ', ' ', ' ', ' ', '♟', '♝' ],
            [ '♕', '♙', ' ', ' ', ' ', ' ', '♟', '♛' ],
            [ '♔', ' ', ' ', '♙', ' ', ' ', '♟', '♚' ],
            [ '♗', '♙', ' ', ' ', ' ', ' ', '♟', '♝' ],
            [ '♘', '♙', ' ', ' ', ' ', ' ', '♟', '♞' ],
            [ '♖', '♙', ' ', ' ', ' ', ' ', '♟', '♜' ],
        ];

        // https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler({ col, row, cellName, cellValue }) {
        // ...
    }

    render() {
        return React.createElement(ReactBoard, {
            size: [ 8 /* width */, 8 /* height */ ], // or just `size: 8`
            values: this.board,
            highlight: [ [ 4 /* col index */, 3 /* row index */, ] ],
            clickHandler: this.clickHandler,
        });
    }
}
```
