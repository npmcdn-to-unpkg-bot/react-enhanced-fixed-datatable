'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('qtip2');

var _QtipWrapperComponent = require('./QtipWrapperComponent');

var _QtipWrapperComponent2 = _interopRequireDefault(_QtipWrapperComponent);

var _FilterComponent = require('./FilterComponent');

var _FilterComponent2 = _interopRequireDefault(_FilterComponent);

var _HeaderWrapperComponent = require('./HeaderWrapperComponent');

var _HeaderWrapperComponent2 = _interopRequireDefault(_HeaderWrapperComponent);

var _fixedDataTable = require('fixed-data-table');

var TableMainComponent = (function (_React$Component) {
    _inherits(TableMainComponent, _React$Component);

    function TableMainComponent(props) {
        _classCallCheck(this, TableMainComponent);

        _get(Object.getPrototypeOf(TableMainComponent.prototype), 'constructor', this).call(this, props);
        this.rowGetter = this.rowGetter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
    }

    // Gets the rows for current rendering

    _createClass(TableMainComponent, [{
        key: 'rowGetter',
        value: function rowGetter(rowIndex) {
            return this.props.filteredRows[rowIndex];
        }

        // React-renderable content for cells
    }, {
        key: 'renderCell',
        value: function renderCell(cellData, _1, _2, _3, columnData) {
            var flag = cellData && columnData.filterAll.length > 0 ? cellData.toLowerCase().indexOf(columnData.filterAll.toLowerCase()) >= 0 : false;
            return _react2['default'].createElement(
                'span',
                { style: flag ? { backgroundColor: 'yellow' } : {} },
                _react2['default'].createElement(_QtipWrapperComponent2['default'], { rawLabel: cellData })
            );
        }

        // Creates Qtip
    }, {
        key: 'createQtip',
        value: function createQtip() {
            (0, _jquery2['default'])('.hasQtip').one('mouseenter', function () {
                (0, _jquery2['default'])(this).qtip({
                    content: { text: (0, _jquery2['default'])(this).attr('data-qtip') },
                    hide: { fixed: true, delay: 100 },
                    show: { ready: true },
                    style: { classes: 'qtip-light qtip-rounded qtip-shadow', tip: true },
                    position: { my: 'center left', at: 'center right', viewport: (0, _jquery2['default'])(window) }
                });
            });
        }

        // Creates Qtip after first rendering
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.createQtip();
        }

        // Creates Qtip after update rendering
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.createQtip();
        }

        // Creates Qtip after page scrolling
    }, {
        key: 'onScrollEnd',
        value: function onScrollEnd() {
            this.createQtip();
        }

        // Destroys Qtip before update rendering
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            (0, _jquery2['default'])('.hasQtip').each(function () {
                (0, _jquery2['default'])(this).qtip('destroy', true);
            });
        }

        // FixedDataTable render function
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;

            var rows = this.props.filteredRows;

            return _react2['default'].createElement(
                'div',
                { className: 'col-md-12' },
                _react2['default'].createElement(
                    _fixedDataTable.Table,
                    {
                        rowHeight: 30,
                        onScrollEnd: this.onScrollEnd,
                        rowsCount: props.filteredRows.length,
                        width: 1100,
                        maxHeight: 500,
                        headerHeight: 30,
                        groupHeaderHeight: 50,
                        scrollToColumn: props.goToColumn
                    },
                    props.cols.map(function (col) {
                        return _react2['default'].createElement(
                            _fixedDataTable.ColumnGroup,
                            {
                                header: _react2['default'].createElement(_FilterComponent2['default'], { type: col.type, name: col.name,
                                    max: col.max, min: col.min,
                                    onFilterKeywordChange: props.onFilterKeywordChange
                                }),
                                fixed: col.fixed,
                                align: 'center'
                            },
                            _react2['default'].createElement(_fixedDataTable.Column, {
                                header: _react2['default'].createElement(_HeaderWrapperComponent2['default'], { cellDataKey: col.name, columnData: { displayName: col.displayName, sortFlag: props.sortBy === col.name,
                                        sortDirArrow: props.sortDirArrow, filterAll: props.filterAll, type: col.type },
                                    sortNSet: props.sortNSet, filter: props.filter
                                }),
                                cell: _react2['default'].createElement(MyCell, { data: rows, field: col.name, filterAll: props.filterAll }),
                                width: col.show ? 200 : 0,
                                fixed: col.fixed,
                                allowCellsRecycling: true
                            })
                        );
                    })
                )
            );
        }
    }]);

    return TableMainComponent;
})(_react2['default'].Component);

var MyCell = (function (_React$Component2) {
    _inherits(MyCell, _React$Component2);

    function MyCell() {
        _classCallCheck(this, MyCell);

        _get(Object.getPrototypeOf(MyCell.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MyCell, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var rowIndex = _props.rowIndex;
            var data = _props.data;
            var field = _props.field;
            var filterAll = _props.filterAll;

            var flag = data[rowIndex][field] && filterAll.length > 0 ? data[rowIndex][field].toLowerCase().indexOf(filterAll.toLowerCase()) >= 0 : false;
            return _react2['default'].createElement(
                _fixedDataTable.Cell,
                {
                    columnKey: field
                },
                _react2['default'].createElement(
                    'span',
                    { style: flag ? { backgroundColor: 'yellow' } : {} },
                    _react2['default'].createElement(_QtipWrapperComponent2['default'], { rawLabel: data[rowIndex][field] })
                )
            );
        }
    }]);

    return MyCell;
})(_react2['default'].Component);

TableMainComponent.displayName = 'TableMainComponent';

// Uncomment properties you need
// TableMainComponent.propTypes = {};
// TableMainComponent.defaultProps = {};

exports['default'] = TableMainComponent;
module.exports = exports['default'];