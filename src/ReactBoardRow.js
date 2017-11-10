import React from 'react';
import PropTypes from 'prop-types';

import { range, arrayEq } from './utils';
import ReactBoardCell from './ReactBoardCell';

const { DOM } = React;


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
        const cells = range(0, this.props.size - 1)
            .map((col) => {
                const isHighlighted = (this.props.highlight.indexOf(col) >= 0);

                return React.createElement(ReactBoardCell, {
                    key: col,
                    row: this.props.row,
                    col,
                    value: this.props.values[col],
                    isHighlighted,
                    clickHandler: this.props.clickHandler,
                });
            });

        return DOM.div({ className: 'react-board-row' }, cells);
    }
}

ReactBoardRow.propTypes = {
    row: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    values: PropTypes.array,
    highlight: PropTypes.arrayOf(PropTypes.number),
    clickHandler: PropTypes.func,
};

ReactBoardRow.defaultProps = {
    values: [],
    highlight: [],
    clickHandler() {},
};

export default ReactBoardRow;
