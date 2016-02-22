'use strict';

import React from 'react';
import ReactBoardCell from './ReactBoardCell';

const DOM = React.DOM;

/**
 * @param {Array.<number|string|null|undefined|boolean>} arr1
 * @param {Array.<number|string|null|undefined|boolean>} arr2
 * @return {boolean}
 */
const arrayEq = function(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => (value === arr2[index]))
    );
};


class ReactBoardRow extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            !arrayEq(this.props.values, nextProps.values) ||
            !arrayEq(this.props.highlight, nextProps.highlight) ||
            this.props.size !== nextProps.size ||
            this.props.clickHandler !== nextProps.clickHandler
        );
    }

    render() {
        const cells = Array.from(
            new Array(this.props.size),
            (_, col) => {
                const isHighlighted = (this.props.highlight.indexOf(col) >= 0);

                return React.createElement(ReactBoardCell, {
                    key: col,
                    row: this.props.row,
                    col,
                    value: this.props.values[col],
                    isHighlighted,
                    clickHandler: this.props.clickHandler,
                });
            }
        );

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
    clickHandler: React.PropTypes.func,
};

ReactBoardRow.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {},
};

export default ReactBoardRow;
