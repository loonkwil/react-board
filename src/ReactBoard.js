'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ReactBoardRow from './ReactBoardRow';

const DOM = React.DOM;


const ReactBoard = function({ size, values, highlight, clickHandler }) {
    const [ width, height ] = (Array.isArray(size)) ?
        size : [ size, size ];

    const rows = Array.from(
        new Array(height),
        (_, row) => {
            const valuesInOneRow = Array.from(
                new Array(width),
                (_, colIndex) => {
                    const oneColumn = values[colIndex] || [];
                    return oneColumn[row];
                }
            );

            const highlightedCells = highlight.
                filter(([ hc, hr ]) => (hr === row)).
                map(([ hc ]) => hc);

            return React.createElement(ReactBoardRow, {
                key: row,
                row,
                size: width,
                values: valuesInOneRow,
                highlight: highlightedCells,
                clickHandler,
            });
        }
    ).reverse();

    return DOM.div({ className: 'react-board' }, rows);
};

ReactBoard.propTypes = {
    /* Size of the board */
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.number
        ),
    ]).isRequired,

    /*
     * Values of the cells. Every value must be a primitive value (number,
     * string, null, undefined or boolean).
     *
     * If you have an 4x4 board and the order of the cells are the following:
     * a4 b4 c4 d4
     * a3 b3 c3 d3
     * a2 b2 c2 d2
     * a1 b1 c1 d1
     *
     *
     * Then the order of the `values` array should look like this:
     * values = [
     *   [ a1, a2, a3, a4 ],
     *   [ b1, b2, b3, b4 ],
     *   [ c1, c2, c3, c4 ],
     *   [ d1, d2, d3, d4 ]
     * ]
     *
     * If the table is empty, you can just pass an empty array (or `undefined`):
     * values = []
     *
     * If one column is empty:
     * values = [
     *   [ a1, a2, a3, a4 ],
     *   [],
     *   [ c1, c2, c3, c4 ]
     * ]
     *
     * If the second part of the column is empty:
     * values = [
     *   [ a1, a2, a3 ],
     *   [ b1 ],
     *   [ c1, c2 ],
     *   [ d1, d2, d3, d4 ]
     * ]
     */
    values: PropTypes.arrayOf(
        PropTypes.array
    ),

    /*
     * You can highlight some of the cells with this parameter.
     * if your table look like this:
     * a4 b4 c4 d4
     * a3 b3 c3 d3
     * a2 b2 c2 d2
     * a1 b1 c1 d1
     *
     * and you want to highlight the a1 and the b3 cells, then the `highlight`
     * parameter should look like this:
     * highlight = [ [ 0, 0 ], [ 1, 2 ] ]
     */
    highlight: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)
    ),

    /* Do something when the user click the cells */
    clickHandler: PropTypes.func,
};

ReactBoard.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {},
};

export default ReactBoard;
