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

var _QtipWrapperComponent = require('./QtipWrapperComponent');

var _QtipWrapperComponent2 = _interopRequireDefault(_QtipWrapperComponent);

var HeaderWrapperComponent = (function (_React$Component) {
    _inherits(HeaderWrapperComponent, _React$Component);

    function HeaderWrapperComponent() {
        _classCallCheck(this, HeaderWrapperComponent);

        _get(Object.getPrototypeOf(HeaderWrapperComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(HeaderWrapperComponent, [{
        key: 'popupFilter',

        // Pops up the column-wise filter dialogue
        value: function popupFilter() {}
    }, {
        key: 'render',
        value: function render() {
            var columnData = this.props.columnData,
                filter = this.props.filter;
            return _react2['default'].createElement(
                'div',
                { className: 'header' },
                _react2['default'].createElement(
                    'a',
                    { href: '#', onClick: this.props.sortNSet.bind(null, this.props.cellDataKey) },
                    _react2['default'].createElement(_QtipWrapperComponent2['default'], { rawLabel: columnData.displayName }),
                    columnData.sortFlag ? columnData.sortDirArrow : ''
                ),
                '  ',
                filter === 'ALL' || filter === 'COLUMN_WISE' ? _react2['default'].createElement('i', { className: 'fa fa-filter unselected',
                    onClick: this.popupFilter }) : _react2['default'].createElement('div', null)
            );
        }
    }]);

    return HeaderWrapperComponent;
})(_react2['default'].Component);

HeaderWrapperComponent.displayName = 'HeaderWrapperComponent';

// Uncomment properties you need
// HeaderWrapperComponent.propTypes = {};
// HeaderWrapperComponent.defaultProps = {};

exports['default'] = HeaderWrapperComponent;
module.exports = exports['default'];