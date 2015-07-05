'use strict';

import React from 'react';
import ReactBoardCell from './ReactBoardCell';

let DOM = React.DOM;


export default class ReactBoardRow extends React.Component {
    render() {
        let cells = (new Array(this.props.size)).
            fill(undefined).
            map((v, col) => {
                let isHighlighted = (this.props.highlight.indexOf(col) > -1);

                return React.createElement(ReactBoardCell, {
                    key: `${col}-${this.props.row}`,
                    row: this.props.row,
                    col,
                    value: this.props.values[col],
                    isHighlighted,
                    clickHandler: this.props.clickHandler
                });
            });

        return DOM.div({ className: 'react-board-row' }, cells);
    }
}

ReactBoardRow.propTypes = {
    row: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    values: React.PropTypes.array,
    highlight: React.PropTypes.arrayOf(
        React.PropTypes.number
    ),
    clickHandler: React.PropTypes.func
};

ReactBoardRow.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {}
};
