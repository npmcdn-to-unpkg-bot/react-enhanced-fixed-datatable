'use strict';

import React from 'react';
import 'bootstrap-dropdown-checkbox';

class ColumnHiderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.hideColumns = this.hideColumns.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // Prepares tableCols
    componentWillMount() {
        var cols = this.props.cols;
        var colsL = cols.length;
        for (var i = 0; i < colsL; i++) {
            this.props.tableCols.push({id: cols[i].name, label: cols[i].displayName, isChecked: true});
        }
    }

    // Updates column show/hide settings
    hideColumns(list) {
        var cols = this.props.cols, filters = this.props.filters;
        for (var i = 0; i < list.length; i++) {
            cols[i].show = list[i].isChecked;
            if (this.props.hideFilter) {
                if (!cols[i].show) {
                    filters[cols[i].name].hide = true;
                } else {
                    filters[cols[i].name].hide = false;
                }
            }
        }
        this.props.updateCols(cols, filters);
    }

    componentDidMount() {
        var hideColumns = this.hideColumns;

        // Dropdown checklist
        $('#hide_column_checklist').dropdownCheckbox({
            data: this.props.tableCols,
            autosearch: true,
            title: 'Show / Hide Columns',
            hideHeader: false,
            showNbSelected: true
        });

        // Handles dropdown checklist event
        $('#hide_column_checklist').on('change', function () {
            var list = ($('#hide_column_checklist').dropdownCheckbox('items'));
            hideColumns(list);
        });
    }

    render() {
        return (
            <div id="hide_column_checklist" className="top-btn"></div>
        );
    }
}

ColumnHiderComponent.displayName = 'ColumnHiderComponent';

//ColumnHiderComponent.propTypes = {
//};
ColumnHiderComponent.defaultProps = {
    tableCols: []
};

export default ColumnHiderComponent;
