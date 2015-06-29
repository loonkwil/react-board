'use strict';

import React from 'react';
import ReactBoardCell from './ReactBoardCell';

let DOM = React.DOM;


export default class ReactBoardRow extends React.Component {
    render() {
        let cells = (new Array(this.props.size)).
            fill(null).
            map((oneItem, index) => {
                let isHighlighted = (this.props.highlight.indexOf(index) > -1);

                return React.createElement(ReactBoardCell, {
                    key: index,
                    row: this.props.row,
                    col: index,
                    value: this.props.values[index] || null,
                    isHighlighted,
                    clickHandler: this.props.clickHandler
                });
            });

        return DOM.div({
            className: 'react-board-row'
        }, cells);
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
