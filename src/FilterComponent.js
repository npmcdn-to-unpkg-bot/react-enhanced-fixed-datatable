'use strict';

import React from 'react';

class FilterComponent extends React.Component {
    render() {
        switch (this.props.type) {
            case 'NUMBER':
                return (
                    <div className="headerFilters">
                        <input type='text' id={'range-'+this.props.name} readOnly
                               style={{border:0,color:'#f6931f'}}></input>

                        <div className='rangeSlider' data-max={this.props.max}
                             data-min={this.props.min} data-column={this.props.name}></div>
                    </div>
                );
            case 'STRING':
                return (
                    <div className="headerFilters">
                        <input className="form-control" placeholder='Input a keyword' data-column={this.props.name}
                               onChange={this.props.onFilterKeywordChange}/>
                    </div>
                );
        }
    }
}

FilterComponent.displayName = 'FilterComponent';

// Uncomment properties you need
// FilterComponent.propTypes = {};
// FilterComponent.defaultProps = {};

export default FilterComponent;
