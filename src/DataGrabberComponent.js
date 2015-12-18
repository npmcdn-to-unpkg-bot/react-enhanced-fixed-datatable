'use strict';

import React from 'react';
import FileGrabber from './FileGrabberComponent'
import ClipboardGrabber from './ClipboardGrabberComponent'
import _ from 'lodash';

class DataGrabberComponent extends React.Component {
    // Prepares table content data for download or copy button
    prepareContent() {
        var content = [], cols = this.props.cols, rows = this.props.rows;

        _.each(cols, function (e) {
            content.push((e.displayName || 'Unknown'), '\t');
        })
        content.pop();

        _.each(rows, function (row) {
            content.push('\r\n');
            _.each(cols, function (col) {
                content.push(row[col.name], '\t');
            })
            content.pop();
        })
        return content.join('');
    }

    render() {
        var getData = this.props.getData;
        if (getData === 'NONE') {
            return <div></div>;
        }

        var content = this.prepareContent();
        return (
            <div>
                <div className="download-btn top-btn">
                    {
                        getData != 'COPY' ? <FileGrabber content={content}/> : <div></div>
                    }
                </div>
                <div  className="download-btn top-btn">
                    {
                        getData != 'DOWNLOAD' ? <ClipboardGrabber content={content}/> : <div></div>
                    }
                </div>
            </div>
        );
    }
}

DataGrabberComponent.displayName = 'DataGrabberComponent';

// Uncomment properties you need
// DataGrabberComponent.propTypes = {};
// DataGrabberComponent.defaultProps = {};

export default DataGrabberComponent;
