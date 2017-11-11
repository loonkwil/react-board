import React from 'react';
import PropTypes from 'prop-types';

import { getCellName } from './utils';

/**
 * @param {*} value
 * @return {string}
 */
function convertValueToString(value) {
    return (value === null || typeof value === 'undefined') ?
        '' : value.toString();
}


class ReactBoardCell extends React.Component {
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

        const classNames = ['react-board-cell'];
        if (this.props.isHighlighted) {
            classNames.push('react-board-highlighted');
        }

        return (
            <div
                className={classNames.join(' ')}
                data-cell-value={convertValueToString(cellValue)}
                data-cell-name={cellName}
                onClick={() => this.props.clickHandler({
                    col: this.props.col,
                    row: this.props.row,
                    cellName,
                    cellValue,
                })}
            />
        );
    }
}

ReactBoardCell.propTypes = {
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    value: (props, propName) => {
        const value = props[propName];
        const validTypes = ['undefined', 'string', 'number', 'boolean'];
        if (value !== null && validTypes.indexOf(typeof value) === -1) {
            const msg = 'The value of the cell should be a primitive value ' +
                `(null, ${validTypes.join(', ')})!`;
            return new Error(msg);
        }

        return null;
    },
    isHighlighted: PropTypes.bool,
    clickHandler: PropTypes.func,
};

ReactBoardCell.defaultProps = {
    value: null,
    isHighlighted: false,
    clickHandler() {},
};

export default ReactBoardCell;
