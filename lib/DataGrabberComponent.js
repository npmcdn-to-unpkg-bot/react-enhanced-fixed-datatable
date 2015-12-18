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

var _FileGrabberComponent = require('./FileGrabberComponent');

var _FileGrabberComponent2 = _interopRequireDefault(_FileGrabberComponent);

var _ClipboardGrabberComponent = require('./ClipboardGrabberComponent');

var _ClipboardGrabberComponent2 = _interopRequireDefault(_ClipboardGrabberComponent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var DataGrabberComponent = (function (_React$Component) {
    _inherits(DataGrabberComponent, _React$Component);

    function DataGrabberComponent() {
        _classCallCheck(this, DataGrabberComponent);

        _get(Object.getPrototypeOf(DataGrabberComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DataGrabberComponent, [{
        key: 'prepareContent',

        // Prepares table content data for download or copy button
        value: function prepareContent() {
            var content = [],
                cols = this.props.cols,
                rows = this.props.rows;

            _lodash2['default'].each(cols, function (e) {
                content.push(e.displayName || 'Unknown', '\t');
            });
            content.pop();

            _lodash2['default'].each(rows, function (row) {
                content.push('\r\n');
                _lodash2['default'].each(cols, function (col) {
                    content.push(row[col.name], '\t');
                });
                content.pop();
            });
            return content.join('');
        }
    }, {
        key: 'render',
        value: function render() {
            var getData = this.props.getData;
            if (getData === 'NONE') {
                return _react2['default'].createElement('div', null);
            }

            var content = this.prepareContent();
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { className: 'download-btn top-btn' },
                    getData != 'COPY' ? _react2['default'].createElement(_FileGrabberComponent2['default'], { content: content }) : _react2['default'].createElement('div', null)
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'download-btn top-btn' },
                    getData != 'DOWNLOAD' ? _react2['default'].createElement(_ClipboardGrabberComponent2['default'], { content: content }) : _react2['default'].createElement('div', null)
                )
            );
        }
    }]);

    return DataGrabberComponent;
})(_react2['default'].Component);

DataGrabberComponent.displayName = 'DataGrabberComponent';

// Uncomment properties you need
// DataGrabberComponent.propTypes = {};
// DataGrabberComponent.defaultProps = {};

exports['default'] = DataGrabberComponent;
module.exports = exports['default'];