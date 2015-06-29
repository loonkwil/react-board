'use strict';

import React from 'react';
import ReactBoardCell from './ReactBoardCell';

let DOM = React.DOM;


export default class ReactBoardRow extends React.Component {
    render() {
        let cells = (new Array(this.props.values.length)).
            fill(null).
            map((oneItem, index) => {
                let isHighlighted = (
                    this.props.highlight.indexOf(index) !== -1
                );

                return React.createElement(ReactBoardCell, {
                    key: index,
                    rowIndex: this.props.rowIndex,
                    cellIndex: index,
                    value: this.props.values[index] || null,
                    isHighlighted
                });
            });

        return DOM.div({
            className: 'react-board-row'
        }, cells);
    }
}

ReactBoardRow.propTypes = {
    values: React.PropTypes.array,
    rowIndex: React.PropTypes.number.isRequired,
    highlight: React.PropTypes.arrayOf(
        React.PropTypes.number
    )
};

ReactBoardRow.defaultProps = {
    values: [],
    highlight: []
};
