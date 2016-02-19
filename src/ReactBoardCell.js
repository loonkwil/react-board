'use strict';

import React from 'react';

const DOM = React.DOM;

/**
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
const getCellName = (col, row) => {
    const first = 'a'.charCodeAt();
    const length = 'z'.charCodeAt() - first + 1;

    const x = String.fromCharCode(first + (col % length));
    const y = row + 1;
    return x + y;
};


export default class ReactBoardCell extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.value !== nextProps.value ||
            this.props.isHighlighted !== nextProps.isHighlighted ||
            this.props.clickHandler !== nextProps.clickHandler
        );
    }

    render() {
        const cellName = getCellName(this.props.col, this.props.row);
        const cellValue = (this.props.value === null) ? '' : this.props.value;

        const classNames = [ 'react-board-cell' ];
        if (this.props.isHighlighted) {
            classNames.push('react-board-highlighted');
        }

        return DOM.div({
            className: classNames.join(' '),
            'data-cell-value': cellValue,
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
            return new Error('The value of the cell should be a primitive ' +
                'value (number, string, null, undefined or boolean)!');
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
