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

var _reactChosen = require('react-chosen');

var _reactChosen2 = _interopRequireDefault(_reactChosen);

var _QtipWrapperComponent = require('./QtipWrapperComponent');

var _QtipWrapperComponent2 = _interopRequireDefault(_QtipWrapperComponent);

var ColumnScrollerComponent = (function (_React$Component) {
    _inherits(ColumnScrollerComponent, _React$Component);

    function ColumnScrollerComponent() {
        _classCallCheck(this, ColumnScrollerComponent);

        _get(Object.getPrototypeOf(ColumnScrollerComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ColumnScrollerComponent, [{
        key: 'scrollToColumn',

        // Scrolls to user selected column
        value: function scrollToColumn(e) {
            var name = e.target.value,
                cols = this.props.cols,
                index,
                colsL = cols.length;
            for (var i = 0; i < colsL; i++) {
                if (name === cols[i].name) {
                    index = i;
                    break;
                }
            }
            this.props.updateGoToColumn(index);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                _reactChosen2['default'],
                { 'data-placeholder': 'Column Scroller', onChange: this.scrollToColumn },
                this.props.cols.map(function (col) {
                    return _react2['default'].createElement(
                        'option',
                        { title: col.displayName, value: col.name },
                        _react2['default'].createElement(_QtipWrapperComponent2['default'], { rawLabel: col.displayName })
                    );
                })
            );
        }
    }]);

    return ColumnScrollerComponent;
})(_react2['default'].Component);

ColumnScrollerComponent.displayName = 'ColumnScrollerComponent';

// Uncomment properties you need
// ColumnScrollerComponent.propTypes = {};
// ColumnScrollerComponent.defaultProps = {};

exports['default'] = ColumnScrollerComponent;
module.exports = exports['default'];