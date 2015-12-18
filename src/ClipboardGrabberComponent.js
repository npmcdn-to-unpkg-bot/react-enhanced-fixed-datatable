'use strict';

import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard'
import $ from 'jquery';

class ClipboardGrabberComponent extends React.Component {
    render() {
        return (
            <div>
                <ReactZeroClipboard text={this.props.content}>
                    <button className="btn btn-default">Copy</button>
                </ReactZeroClipboard>
            </div>
        )
    }
}

ClipboardGrabberComponent.displayName = 'ClipboardGrabberComponent';

// Uncomment properties you need
// ClipboardGrabberComponent.propTypes = {};
// ClipboardGrabberComponent.defaultProps = {};

export default ClipboardGrabberComponent;
