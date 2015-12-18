'use strict';

import React from 'react';
import QtipWrapper from './QtipWrapperComponent'

class HeaderWrapperComponent extends React.Component {
    // Pops up the column-wise filter dialogue
    popupFilter() {
    }

    render() {
        var columnData = this.props.columnData, filter = this.props.filter;
        return (
            <div className="header">
                <a href='#' onClick={this.props.sortNSet.bind(null, this.props.cellDataKey)}>
                    <QtipWrapper rawLabel={columnData.displayName}/>
                    {columnData.sortFlag ? columnData.sortDirArrow : ''}
                </a>
                &nbsp;&nbsp;
                {
                    (filter === 'ALL' || filter === 'COLUMN_WISE') ?
                        <i className='fa fa-filter unselected'
                           onClick={this.popupFilter}></i> :
                        <div></div>
                }
            </div>
        );
    }
}

HeaderWrapperComponent.displayName = 'HeaderWrapperComponent';

// Uncomment properties you need
// HeaderWrapperComponent.propTypes = {};
// HeaderWrapperComponent.defaultProps = {};

export default HeaderWrapperComponent;
