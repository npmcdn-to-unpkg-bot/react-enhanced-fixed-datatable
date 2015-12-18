'use strict';

var React = require('react');
import ColumnHider from './ColumnHiderComponent';
import DataGrabber from './DataGrabberComponent';
import Filter from './FilterComponent'

class TablePrefixComponent extends React.Component {
    render() {
        return (
            <div>
                <div className="col-md-9">
                    <div className="showHide">
                        {
                            this.props.hider ?
                                <ColumnHider cols={this.props.cols} filters={this.props.filters}
                                             hideFilter={this.props.hideFilter}
                                             updateCols={this.props.updateCols}/> :
                                <div></div>
                        }
                    </div>
                    <div className="download">
                        <DataGrabber cols={this.props.cols} rows={this.props.rows}
                                     getData={this.props.getData}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="filter">
                        {
                            (this.props.filter === 'ALL' || this.props.filter === 'GLOBAL') ?
                                <Filter type='STRING' name='all'
                                        onFilterKeywordChange={this.props.onFilterKeywordChange}/> :
                                <div></div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

TablePrefixComponent.displayName = 'TablePrefixComponent';

// Uncomment properties you need
// TablePrefixComponent.propTypes = {};
// TablePrefixComponent.defaultProps = {};

export default TablePrefixComponent;
