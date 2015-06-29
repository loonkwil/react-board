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
                    filter(([ rowIndex ]) => (rowIndex === index)).
                    map(([ rowIndex, colIndex ]) => colIndex);

                return React.createElement(ReactBoardRow, {
                    key: index,
                    rowIndex: index,
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
     *
     * a4 b4 c4 d4
     * a3 b3 c3 d3
     * a2 b2 c2 d2
     * a1 b1 c1 d1
     *
     * [
     *   [ a1, b1, c1, d1 ],
     *   [ a2, b2, c2, d2 ],
     *   [ a3, b3, c3, d3 ],
     *   [ a4, b4, c4, d4 ]
     * ]
     */
    values: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(React.PropTypes.any)
    ),

    highlight: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(React.PropTypes.number)
    ),

    clickHandler: React.PropTypes.func
};

ReactBoard.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {}
};
