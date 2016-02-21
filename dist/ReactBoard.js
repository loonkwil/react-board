(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactBoard"] = factory(require("react"));
	else
		root["ReactBoard"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ReactBoardRow = __webpack_require__(2);

	var _ReactBoardRow2 = _interopRequireDefault(_ReactBoardRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOM = _react2.default.DOM;

	var ReactBoard = function (_React$Component) {
	    _inherits(ReactBoard, _React$Component);

	    function ReactBoard() {
	        _classCallCheck(this, ReactBoard);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBoard).apply(this, arguments));
	    }

	    _createClass(ReactBoard, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var rows = Array.from(new Array(this.props.size), function (_, row) {
	                var valuesInOneRow = Array.from(new Array(_this2.props.size), function (_, colIndex) {
	                    var oneColumn = _this2.props.values[colIndex] || [];
	                    return oneColumn[row] || null;
	                });

	                var highlightedCells = _this2.props.highlight.filter(function (_ref) {
	                    var _ref2 = _slicedToArray(_ref, 2);

	                    var hc = _ref2[0];
	                    var hr = _ref2[1];
	                    return hr === row;
	                }).map(function (_ref3) {
	                    var _ref4 = _slicedToArray(_ref3, 1);

	                    var hc = _ref4[0];
	                    return hc;
	                });

	                return _react2.default.createElement(_ReactBoardRow2.default, {
	                    key: row,
	                    row: row,
	                    size: _this2.props.size,
	                    values: valuesInOneRow,
	                    highlight: highlightedCells,
	                    clickHandler: _this2.props.clickHandler
	                });
	            }).reverse();

	            return DOM.div({ className: 'react-board' }, rows);
	        }
	    }]);

	    return ReactBoard;
	}(_react2.default.Component);

	exports.default = ReactBoard;


	ReactBoard.propTypes = {
	    /* Size of the board (the width and the height is always equal) */
	    size: _react2.default.PropTypes.number.isRequired,

	    /*
	     * Values of the cells. Every value must be a primitive value (number,
	     * string, null, undefined or boolean).
	     *
	     * If you have an 4x4 board and the order of the cells are the following:
	     * a4 b4 c4 d4
	     * a3 b3 c3 d3
	     * a2 b2 c2 d2
	     * a1 b1 c1 d1
	     *
	     *
	     * Then the order of the `values` array should look like this:
	     * values = [
	     *   [ a1, a2, a3, a4 ],
	     *   [ b1, b2, b3, b4 ],
	     *   [ c1, c2, c3, c4 ],
	     *   [ d1, d2, d3, d4 ]
	     * ]
	     *
	     * If the table is empty, you can just pass an empty array (or `undefined`):
	     * values = []
	     *
	     * If one column is empty:
	     * values = [
	     *   [ a1, a2, a3, a4 ],
	     *   [],
	     *   [ c1, c2, c3, c4 ]
	     * ]
	     *
	     * If the second part of the column is empty:
	     * values = [
	     *   [ a1, a2, a3 ],
	     *   [ b1 ],
	     *   [ c1, c2 ],
	     *   [ d1, d2, d3, d4 ]
	     * ]
	     */
	    values: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.any)),

	    /*
	     * You can highlight some of the cells with this parameter.
	     * if your table look like this:
	     * a4 b4 c4 d4
	     * a3 b3 c3 d3
	     * a2 b2 c2 d2
	     * a1 b1 c1 d1
	     *
	     * and you want to highlight the a1 and the b3 cells, then the `highlight`
	     * parameter should look like this:
	     * highlight = [ [ 0, 0 ], [ 1, 2 ] ]
	     */
	    highlight: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)),

	    /* Do something when the user click the cells */
	    clickHandler: _react2.default.PropTypes.func
	};

	ReactBoard.defaultProps = {
	    values: [],
	    highlight: [],
	    clickHandler: function clickHandler() {}
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ReactBoardCell = __webpack_require__(3);

	var _ReactBoardCell2 = _interopRequireDefault(_ReactBoardCell);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOM = _react2.default.DOM;

	/**
	 * @param {Array.<number|string|null|undefined|boolean>} arr1
	 * @param {Array.<number|string|null|undefined|boolean>} arr2
	 * @return {boolean}
	 */
	var arrayEq = function arrayEq(arr1, arr2) {
	    return arr1.length === arr2.length && arr1.every(function (value, index) {
	        return value === arr2[index];
	    });
	};

	var ReactBoardRow = function (_React$Component) {
	    _inherits(ReactBoardRow, _React$Component);

	    function ReactBoardRow() {
	        _classCallCheck(this, ReactBoardRow);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBoardRow).apply(this, arguments));
	    }

	    _createClass(ReactBoardRow, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            return !arrayEq(this.props.values, nextProps.values) || !arrayEq(this.props.highlight, nextProps.highlight) || this.props.size !== nextProps.size || this.props.clickHandler !== nextProps.clickHandler;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var cells = Array.from(new Array(this.props.size), function (_, col) {
	                var isHighlighted = _this2.props.highlight.indexOf(col) >= 0;

	                return _react2.default.createElement(_ReactBoardCell2.default, {
	                    key: col,
	                    row: _this2.props.row,
	                    col: col,
	                    value: _this2.props.values[col],
	                    isHighlighted: isHighlighted,
	                    clickHandler: _this2.props.clickHandler
	                });
	            });

	            return DOM.div({ className: 'react-board-row' }, cells);
	        }
	    }]);

	    return ReactBoardRow;
	}(_react2.default.Component);

	exports.default = ReactBoardRow;


	ReactBoardRow.propTypes = {
	    row: _react2.default.PropTypes.number.isRequired,
	    size: _react2.default.PropTypes.number.isRequired,
	    values: _react2.default.PropTypes.array,
	    highlight: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
	    clickHandler: _react2.default.PropTypes.func
	};

	ReactBoardRow.defaultProps = {
	    values: [],
	    highlight: [],
	    clickHandler: function clickHandler() {}
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOM = _react2.default.DOM;

	/**
	 * Returns an array of elements from start to end, inclusive
	 * @param {number} start
	 * @param {number} end
	 * @return {Array.<number>}
	 */
	var range = function range(start, end) {
	    return Array.from(new Array(end - start + 1), function (_, i) {
	        return start + i;
	    });
	};

	/**
	 * @param {number} col
	 * @return {string}
	 */
	var getColName = function () {
	    var signs = range('a'.charCodeAt(), 'z'.charCodeAt()).map(function (code) {
	        return String.fromCharCode(code);
	    });

	    return function getColName(col) {
	        if (col < signs.length) {
	            return signs[col];
	        }
	        return getColName(Math.floor(col / signs.length) - 1) + getColName(col % signs.length);
	    };
	}();

	/**
	 * @param {number} row
	 * @return {string}
	 */
	var getRowName = function getRowName(row) {
	    return (row + 1).toString();
	};

	/**
	 * @param {number} col
	 * @param {number} row
	 * @return {string}
	 */
	var getCellName = function getCellName(col, row) {
	    return getColName(col) + getRowName(row);
	};

	var ReactBoardCell = function (_React$Component) {
	    _inherits(ReactBoardCell, _React$Component);

	    function ReactBoardCell() {
	        _classCallCheck(this, ReactBoardCell);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ReactBoardCell).apply(this, arguments));
	    }

	    _createClass(ReactBoardCell, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            return this.props.value !== nextProps.value || this.props.isHighlighted !== nextProps.isHighlighted || this.props.clickHandler !== nextProps.clickHandler;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var cellName = getCellName(this.props.col, this.props.row);
	            var cellValue = this.props.value === null ? '' : this.props.value;

	            var classNames = ['react-board-cell'];
	            if (this.props.isHighlighted) {
	                classNames.push('react-board-highlighted');
	            }

	            return DOM.div({
	                className: classNames.join(' '),
	                'data-cell-value': cellValue,
	                'data-cell-name': cellName,
	                onClick: function onClick() {
	                    return _this2.props.clickHandler({
	                        col: _this2.props.col,
	                        row: _this2.props.row,
	                        cellName: cellName,
	                        cellValue: cellValue
	                    });
	                }
	            });
	        }
	    }]);

	    return ReactBoardCell;
	}(_react2.default.Component);

	exports.default = ReactBoardCell;


	ReactBoardCell.propTypes = {
	    row: _react2.default.PropTypes.number.isRequired,
	    col: _react2.default.PropTypes.number.isRequired,
	    value: function value(props, propName) {
	        var value = props[propName];
	        var validTypes = ['undefined', 'string', 'number', 'boolean'];
	        if (value !== null && validTypes.indexOf(typeof value === 'undefined' ? 'undefined' : _typeof(value)) === -1) {
	            return new Error('The value of the cell should be a primitive ' + 'value (number, string, null, undefined or boolean)!');
	        }
	    },
	    isHighlighted: _react2.default.PropTypes.bool,
	    clickHandler: _react2.default.PropTypes.func
	};

	ReactBoardCell.defaultProps = {
	    value: null,
	    isHighlighted: false,
	    clickHandler: function clickHandler() {}
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;