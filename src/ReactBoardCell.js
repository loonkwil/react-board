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
        let props = this.props;
        let cellName = getCellName(props.rowIndex, props.cellIndex);
        let cellValue = (props.value === null) ? '' : props.value;

        return DOM.div({
            className: 'react-board-cell',
            'data-cell-value': cellValue,
            'data-cell-name': cellName
        });
    }
}

ReactBoardCell.propTypes = {
    value: React.PropTypes.any,
    rowIndex: React.PropTypes.number.isRequired,
    cellIndex: React.PropTypes.number.isRequired
};

ReactBoardCell.defaultProps = {
    value: null
};
