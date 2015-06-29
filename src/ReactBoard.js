'use strict';

import React from 'react';
import ReactBoardRow from './ReactBoardRow';

let DOM = React.DOM;


export default class ReactBoard extends React.Component {
    render() {
        let rows = (new Array(this.props.size)).
            fill(null).
            map((oneItem, index) => {
                let highlightedCells = this.props.highlight.
                    filter(([ row ]) => (row === index)).
                    map(([ row, col ]) => col);

                return React.createElement(ReactBoardRow, {
                    key: index,
                    row: index,
                    size: this.props.size,
                    values: this.props.values[index] || [],
                    highlight: highlightedCells,
                    clickHandler: this.props.clickHandler
                });
            }).
            reverse();

        return DOM.div({ className: 'react-board' }, rows);
    }
}

ReactBoard.propTypes = {
    /* Size of the board (the width and the height is always equal) */
    size: React.PropTypes.number.isRequired,

    /*
     * Values of the cells.
     * If you have an 4x4 board and the order of the cells are the following:
     * a4 b4 c4 d4
     * a3 b3 c3 d3
     * a2 b2 c2 d2
     * a1 b1 c1 d1
     *
     * Then the order of the `values` array should look like this:
     * values = [
     *   [ a1, b1, c1, d1 ],
     *   [ a2, b2, c2, d2 ],
     *   [ a3, b3, c3, d3 ],
     *   [ a4, b4, c4, d4 ]
     * ]
     *
     * If the table is empty, you can just pass an empty array (or `undefined`):
     * values = []
     *
     * If one row is empty:
     * values = [
     *   [ a1, b1 ],
     *   []
     * ]
     *
     * If the second part of the row is empty:
     * values = [
     *   [ a1, b1, c1 ],
     *   [ a2 ],
     *   [ a3, b3 ],
     * ]
     */
    values: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(React.PropTypes.any)
    ),

    /*
     * You can highlight some of the cells with this parameter.
     * if your table look like this:
     * a3 b3 c3
     * a2 b2 c2
     * a1 b1 c1
     *
     * and you want to highlight the a1 and the b3 cells, then the `highlight`
     * parameter should look like this:
     * highlight = [ [ 0, 0 ], [ 2, 1 ] ]
     */
    highlight: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(React.PropTypes.number)
    ),

    /* Do something when the user click the cells */
    clickHandler: React.PropTypes.func
};

ReactBoard.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {}
};
