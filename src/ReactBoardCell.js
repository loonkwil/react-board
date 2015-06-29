'use strict';

import React from 'react';

let DOM = React.DOM;

/**
 * @param {number} rowIndex
 * @param {number} colIndex
 * @return {string}
 */
let getCellName = function(rowIndex, colIndex) {
    const first = 'a'.charCodeAt();
    const length = 'z'.charCodeAt() - first + 1;

    let x = String.fromCharCode(first + (colIndex % length));
    let y = rowIndex + 1;
    return x + y;
};


export default class ReactBoardCell extends React.Component {
    render() {
        let cellName = getCellName(this.props.rowIndex, this.props.colIndex);
        let cellValue = (this.props.value === null) ? '' : this.props.value;

        let className = 'react-board-cell';
        if (this.props.isHighlighted) {
            className += ' react-board-highlighted';
        }

        return DOM.div({
            className,
            'data-cell-value': cellValue,
            'data-cell-name': cellName,
            onClick: () => {
                this.props.clickHandler({
                    rowIndex: this.props.rowIndex,
                    colIndex: this.props.colIndex,
                    cellName,
                    cellValue
                });
            }
        });
    }
}

ReactBoardCell.propTypes = {
    value: React.PropTypes.any,
    rowIndex: React.PropTypes.number.isRequired,
    colIndex: React.PropTypes.number.isRequired,
    isHighlighted: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
};

ReactBoardCell.defaultProps = {
    value: null,
    isHighlighted: false,
    clickHandler: function() {}
};
