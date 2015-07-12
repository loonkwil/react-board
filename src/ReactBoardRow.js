'use strict';

import React from 'react';
import ReactBoardCell from './ReactBoardCell';

let DOM = React.DOM;

/**
 * @param {Array.<number|string|null|undefined|boolean>} arr1
 * @param {Array.<number|string|null|undefined|boolean>} arr2
 * @return {boolean}
 */
let arrayEq = function(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((v, i) => (v === arr2[i]))
    );
};


export default class ReactBoardRow extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            !arrayEq(this.props.values, nextProps.values) ||
            !arrayEq(this.props.highlight, nextProps.highlight) ||
            this.props.size !== nextProps.size ||
            this.props.clickHandler !== nextProps.clickHandler
        );
    }

    render() {
        let cells = (new Array(this.props.size)).
            fill(undefined).
            map((v, col) => {
                let isHighlighted = (this.props.highlight.indexOf(col) > -1);

                return React.createElement(ReactBoardCell, {
                    key: col,
                    row: this.props.row,
                    col,
                    value: this.props.values[col],
                    isHighlighted,
                    clickHandler: this.props.clickHandler
                });
            });

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
    clickHandler: React.PropTypes.func
};

ReactBoardRow.defaultProps = {
    values: [],
    highlight: [],
    clickHandler: function() {}
};
