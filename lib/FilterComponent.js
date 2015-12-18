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

var FilterComponent = (function (_React$Component) {
    _inherits(FilterComponent, _React$Component);

    function FilterComponent() {
        _classCallCheck(this, FilterComponent);

        _get(Object.getPrototypeOf(FilterComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(FilterComponent, [{
        key: 'render',
        value: function render() {
            switch (this.props.type) {
                case 'NUMBER':
                    return _react2['default'].createElement(
                        'div',
                        { className: 'headerFilters' },
                        _react2['default'].createElement('input', { type: 'text', id: 'range-' + this.props.name, readOnly: true,
                            style: { border: 0, color: '#f6931f' } }),
                        _react2['default'].createElement('div', { className: 'rangeSlider', 'data-max': this.props.max,
                            'data-min': this.props.min, 'data-column': this.props.name })
                    );
                case 'STRING':
                    return _react2['default'].createElement(
                        'div',
                        { className: 'headerFilters' },
                        _react2['default'].createElement('input', { className: 'form-control', placeholder: 'Input a keyword', 'data-column': this.props.name,
                            onChange: this.props.onFilterKeywordChange })
                    );
            }
        }
    }]);

    return FilterComponent;
})(_react2['default'].Component);

FilterComponent.displayName = 'FilterComponent';

// Uncomment properties you need
// FilterComponent.propTypes = {};
// FilterComponent.defaultProps = {};

exports['default'] = FilterComponent;
module.exports = exports['default'];