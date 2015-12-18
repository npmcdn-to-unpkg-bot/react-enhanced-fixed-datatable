'use strict';

import React from 'react';

class FileGrabberComponent extends React.Component {
    constructor(props) {
        super(props);

        this.saveFile = this.saveFile.bind(this);
    }

    // Saves table content to a text file
    saveFile() {
        var blob = new Blob([this.props.content], {type: 'text/plain'});
        var fileName = 'data.txt';

        var downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.innerHTML = 'Download File';
        if (window.webkitURL) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        }
        else {
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

    render() {
        return (
            <button className="btn btn-default" onClick={this.saveFile}>DATA</button>
        );
    }
}

FileGrabberComponent.displayName = 'FileGrabberComponent';

// Uncomment properties you need
// FileGrabberComponent.propTypes = {};
// FileGrabberComponent.defaultProps = {};

export default FileGrabberComponent;
