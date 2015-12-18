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

var FileGrabberComponent = (function (_React$Component) {
    _inherits(FileGrabberComponent, _React$Component);

    function FileGrabberComponent(props) {
        _classCallCheck(this, FileGrabberComponent);

        _get(Object.getPrototypeOf(FileGrabberComponent.prototype), 'constructor', this).call(this, props);

        this.saveFile = this.saveFile.bind(this);
    }

    // Saves table content to a text file

    _createClass(FileGrabberComponent, [{
        key: 'saveFile',
        value: function saveFile() {
            var blob = new Blob([this.props.content], { type: 'text/plain' });
            var fileName = 'data.txt';

            var downloadLink = document.createElement('a');
            downloadLink.download = fileName;
            downloadLink.innerHTML = 'Download File';
            if (window.webkitURL) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(blob);
            } else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(blob);
                downloadLink.onclick = function (event) {
                    document.body.removeChild(event.target);
                };
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'button',
                { className: 'btn btn-default', onClick: this.saveFile },
                'DATA'
            );
        }
    }]);

    return FileGrabberComponent;
})(_react2['default'].Component);

FileGrabberComponent.displayName = 'FileGrabberComponent';

// Uncomment properties you need
// FileGrabberComponent.propTypes = {};
// FileGrabberComponent.defaultProps = {};

exports['default'] = FileGrabberComponent;
module.exports = exports['default'];