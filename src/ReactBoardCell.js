'use strict';

import React from 'react';

let DOM = React.DOM;

/**
 * @param {number} rowIndex
 * @param {number} cellIndex
 * @return {string}
 */
let getCellName = function(rowIndex, cellIndex) {
    const first = 'a'.charCodeAt();
    const length = 'z'.charCodeAt() - first + 1;

    let x = String.fromCharCode(first + (cellIndex % length));
    let y = rowIndex + 1;
    return x + y;
};


export default class ReactBoardCell extends React.Component {
    render() {
        let cellName = getCellName(this.props.rowIndex, this.props.cellIndex);
        let cellValue = (this.props.value === null) ? '' : this.props.value;

        let className = 'react-board-cell';
        if (this.props.isHighlighted) {
            className += ' react-board-highlighted';
        }

        return DOM.div({
            className,
            'data-cell-value': cellValue,
            'data-cell-name': cellName
        });
    }
}

ReactBoardCell.propTypes = {
    value: React.PropTypes.any,
    rowIndex: React.PropTypes.number.isRequired,
    cellIndex: React.PropTypes.number.isRequired,
    isHighlighted: React.PropTypes.bool
};

ReactBoardCell.defaultProps = {
    value: null,
    isHighlighted: false
};
