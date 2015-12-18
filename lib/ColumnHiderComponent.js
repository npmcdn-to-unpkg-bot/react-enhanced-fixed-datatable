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

require('bootstrap-dropdown-checkbox');

var ColumnHiderComponent = (function (_React$Component) {
    _inherits(ColumnHiderComponent, _React$Component);

    function ColumnHiderComponent(props) {
        _classCallCheck(this, ColumnHiderComponent);

        _get(Object.getPrototypeOf(ColumnHiderComponent.prototype), 'constructor', this).call(this, props);
        this.hideColumns = this.hideColumns.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // Prepares tableCols

    _createClass(ColumnHiderComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var cols = this.props.cols;
            var colsL = cols.length;
            for (var i = 0; i < colsL; i++) {
                this.props.tableCols.push({ id: cols[i].name, label: cols[i].displayName, isChecked: true });
            }
        }

        // Updates column show/hide settings
    }, {
        key: 'hideColumns',
        value: function hideColumns(list) {
            var cols = this.props.cols,
                filters = this.props.filters;
            for (var i = 0; i < list.length; i++) {
                cols[i].show = list[i].isChecked;
                if (this.props.hideFilter) {
                    if (!cols[i].show) {
                        filters[cols[i].name].hide = true;
                    } else {
                        filters[cols[i].name].hide = false;
                    }
                }
            }
            this.props.updateCols(cols, filters);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var hideColumns = this.hideColumns;

            // Dropdown checklist
            $('#hide_column_checklist').dropdownCheckbox({
                data: this.props.tableCols,
                autosearch: true,
                title: 'Show / Hide Columns',
                hideHeader: false,
                showNbSelected: true
            });

            // Handles dropdown checklist event
            $('#hide_column_checklist').on('change', function () {
                var list = $('#hide_column_checklist').dropdownCheckbox('items');
                hideColumns(list);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('div', { id: 'hide_column_checklist', className: 'top-btn' });
        }
    }]);

    return ColumnHiderComponent;
})(_react2['default'].Component);

ColumnHiderComponent.displayName = 'ColumnHiderComponent';

//ColumnHiderComponent.propTypes = {
//};
ColumnHiderComponent.defaultProps = {
    tableCols: []
};

exports['default'] = ColumnHiderComponent;
module.exports = exports['default'];