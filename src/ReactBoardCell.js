'use strict';

import React from 'react';

const DOM = React.DOM;

/**
 * Returns an array of elements from start to end, inclusive
 * @param {number} start
 * @param {number} end
 * @return {Array.<number>}
 */
const range = function(start, end) {
    return Array.from(
        new Array(end - start + 1),
        (_, i) => start + i
    );
};

/**
 * @param {number} col
 * @return {string}
 */
const getColName = (function() {
    const signs = range('a'.charCodeAt(), 'z'.charCodeAt()).
        map((code) => String.fromCharCode(code));

    return function getColName(col) {
        if (col < signs.length) {
            return signs[col];
        }
        return getColName(Math.floor(col / signs.length) - 1) +
            getColName(col % signs.length);
    };
}());

/**
 * @param {number} row
 * @return {string}
 */
const getRowName = function(row) {
    return (row + 1).toString();
};

/**
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
const getCellName = function(col, row) {
    return getColName(col) + getRowName(row);
};


export default class ReactBoardCell extends React.Component {
    convertValueToString(value) {
        return (value === null || typeof value === 'undefined') ?
            '' : value.toString();
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.value !== nextProps.value ||
            this.props.isHighlighted !== nextProps.isHighlighted ||
            this.props.clickHandler !== nextProps.clickHandler
        );
    }

    render() {
        const cellName = getCellName(this.props.col, this.props.row);
        const cellValue = this.props.value;

        const classNames = [ 'react-board-cell' ];
        if (this.props.isHighlighted) {
            classNames.push('react-board-highlighted');
        }

        return DOM.div({
            className: classNames.join(' '),
            'data-cell-value': this.convertValueToString(cellValue),
            'data-cell-name': cellName,
            onClick: () => this.props.clickHandler({
                col: this.props.col,
                row: this.props.row,
                cellName,
                cellValue,
            })
        });
    }
}

ReactBoardCell.propTypes = {
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    value: (props, propName) => {
        const value = props[propName];
        const validTypes = [ 'undefined', 'string', 'number', 'boolean' ];
        if (value !== null && validTypes.indexOf(typeof value) === -1) {
            const msg = 'The value of the cell should be a primitive value ' +
                `(null, ${validTypes.join(', ')})!`;
            return new Error(msg);
        }
    },
    isHighlighted: React.PropTypes.bool,
    clickHandler: React.PropTypes.func,
};

ReactBoardCell.defaultProps = {
    value: null,
    isHighlighted: false,
    clickHandler: function() {},
};
