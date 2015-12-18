'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ColumnHiderComponent = require('./ColumnHiderComponent');

var _ColumnHiderComponent2 = _interopRequireDefault(_ColumnHiderComponent);

var _DataGrabberComponent = require('./DataGrabberComponent');

var _DataGrabberComponent2 = _interopRequireDefault(_DataGrabberComponent);

var _FilterComponent = require('./FilterComponent');

var _FilterComponent2 = _interopRequireDefault(_FilterComponent);

var React = require('react');

var TablePrefixComponent = (function (_React$Component) {
    _inherits(TablePrefixComponent, _React$Component);

    function TablePrefixComponent() {
        _classCallCheck(this, TablePrefixComponent);

        _get(Object.getPrototypeOf(TablePrefixComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(TablePrefixComponent, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'col-md-9' },
                    React.createElement(
                        'div',
                        { className: 'showHide' },
                        this.props.hider ? React.createElement(_ColumnHiderComponent2['default'], { cols: this.props.cols, filters: this.props.filters,
                            hideFilter: this.props.hideFilter,
                            updateCols: this.props.updateCols }) : React.createElement('div', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'download' },
                        React.createElement(_DataGrabberComponent2['default'], { cols: this.props.cols, rows: this.props.rows,
                            getData: this.props.getData })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-3' },
                    React.createElement(
                        'div',
                        { className: 'filter' },
                        this.props.filter === 'ALL' || this.props.filter === 'GLOBAL' ? React.createElement(_FilterComponent2['default'], { type: 'STRING', name: 'all',
                            onFilterKeywordChange: this.props.onFilterKeywordChange }) : React.createElement('div', null)
                    )
                )
            );
        }
    }]);

    return TablePrefixComponent;
})(React.Component);

TablePrefixComponent.displayName = 'TablePrefixComponent';

// Uncomment properties you need
// TablePrefixComponent.propTypes = {};
// TablePrefixComponent.defaultProps = {};

exports['default'] = TablePrefixComponent;
module.exports = exports['default'];