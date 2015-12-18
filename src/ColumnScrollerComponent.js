'use strict';

import React from 'react';
import Chosen from 'react-chosen'
import QtipWrapper from './QtipWrapperComponent'

class ColumnScrollerComponent extends React.Component {
    // Scrolls to user selected column
    scrollToColumn(e) {
        var name = e.target.value, cols = this.props.cols, index, colsL = cols.length;
        for (var i = 0; i < colsL; i++) {
            if (name === cols[i].name) {
                index = i;
                break;
            }
        }
        this.props.updateGoToColumn(index);
    }

    render() {
        return (
            <Chosen data-placeholder="Column Scroller" onChange={this.scrollToColumn}>
                {
                    this.props.cols.map(function (col) {
                        return (
                            <option title={col.displayName} value={col.name}>
                                <QtipWrapper rawLabel={col.displayName}/>
                            </option>
                        );
                    })
                }
            </Chosen>
        );
    }
}

ColumnScrollerComponent.displayName = 'ColumnScrollerComponent';

// Uncomment properties you need
// ColumnScrollerComponent.propTypes = {};
// ColumnScrollerComponent.defaultProps = {};

export default ColumnScrollerComponent;
