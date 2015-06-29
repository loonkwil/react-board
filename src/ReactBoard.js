'use strict';

import React from 'react';
import ReactBoardRow from './ReactBoardRow';

let DOM = React.DOM;


export default class ReactBoard extends React.Component {
    render() {
        let props = this.props;
        let rows = (new Array(props.size)).
            fill(null).
            map((oneItem, index) =>
                React.createElement(ReactBoardRow, {
                    key: index,
                    rowIndex: index,
                    values: props.values[index] || []
                })
            );

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
    )
};

ReactBoard.defaultProps = {
    values: []
};
