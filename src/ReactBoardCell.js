'use strict';

import React from 'react';

let DOM = React.DOM;

/**
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
let getCellName = function(col, row) {
    const first = 'a'.charCodeAt();
    const length = 'z'.charCodeAt() - first + 1;

    let x = String.fromCharCode(first + (col % length));
    let y = row + 1;
    return x + y;
};


export default class ReactBoardCell extends React.Component {
    render() {
        let cellName = getCellName(this.props.col, this.props.row);
        let cellValue = (this.props.value === null) ? '' : this.props.value;

        let className = 'react-board-cell';
        if (this.props.isHighlighted) {
            className += ' react-board-highlighted';
        }

        return DOM.div({
            className,
            'data-cell-value': cellValue,
            'data-cell-name': cellName,
            onClick: () => this.props.clickHandler({
                col: this.props.col,
                row: this.props.row,
                cellName,
                cellValue
            })
        });
    }
}

ReactBoardCell.propTypes = {
    row: React.PropTypes.number.isRequired,
    col: React.PropTypes.number.isRequired,
    value: React.PropTypes.any,
    isHighlighted: React.PropTypes.bool,
    clickHandler: React.PropTypes.func
};

ReactBoardCell.defaultProps = {
    value: null,
    isHighlighted: false,
    clickHandler: function() {}
};
