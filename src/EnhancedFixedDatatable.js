var React = require('react');
var $ = require('jquery');
var TablePrefix = require('./TablePrefixComponent');
var TableMain = require('./TableMainComponent');
require('jquery-ui');

class EnhancedFixedDatatable extends  React.Component {
    constructor(props) {
        super(props);

        var cols = [], rows = [], rowsDict = {}, attributes = this.props.input.attributes,
            data = this.props.input.data, col, cell, i, filters = {}, uniqueId = this.props.uniqueId || 'id';

        // Gets column info from input
        var colsDict = {};
        for (i = 0; i < attributes.length; i++) {
            col = attributes[i];
            cols.push({
                displayName: col.display_name,
                name: col.attr_id,
                type: col.datatype,
                fixed: false,
                show: true
            });
            colsDict[col.attr_id] = i;
        }

        // Gets fixed info from configuration
        var fixedArray = this.props.fixed;
        for (i = 0; i < fixedArray.length; i++) {
            var elem = fixedArray[i];
            switch (typeof elem) {
                case 'number':
                    cols[elem].fixed = true;
                    break;
                case 'string':
                    cols[colsDict[elem]].fixed = true;
                    break;
            }
        }

        // Gets data rows from input
        for (i = 0; i < data.length; i++) {
            cell = data[i];
            if (!rowsDict[cell[uniqueId]]) rowsDict[cell[uniqueId]] = {};
            rowsDict[cell[uniqueId]][cell.attr_id] = cell.attr_val;
        }
        for (i in rowsDict) {
            rowsDict[i][uniqueId] = i;
            rows.push(rowsDict[i]);
        }

        // Gets the range of number type features
        for (i = 0; i < cols.length; i++) {
            col = cols[i];
            if (col.type == 'NUMBER') {
                var min = Number.MAX_VALUE, max = -Number.MAX_VALUE;
                for (var j = 0; j < rows.length; j++) {
                    cell = rows[j][col.name];
                    if (typeof cell != 'undefined' && !isNaN(cell)) {
                        cell = Number(cell);
                        max = cell > max ? cell : max;
                        min = cell < min ? cell : min;
                    }
                }
                col.max = max;
                col.min = min;
                filters[col.name] = {type: 'NUMBER', min: min, max: max, hide: false};
            } else {
                filters[col.name] = {type: 'STRING', key: '', hide: false};
            }
        }

        this.rows = rows;

        this.state = {
            goToColumn: null,
            filterAll: '',
            filteredRows: null,
            filters: filters,
            sortBy: uniqueId,
            cols: cols,
            sortDir: props.SortTypes.DESC
        }

        this.sortNSet = this.sortNSet.bind(this);
        this.sortRowsBy = this.sortRowsBy.bind(this);
        this.filterRowsBy = this.filterRowsBy.bind(this);
        this.filterSortNSet = this.filterSortNSet.bind(this);
        this.onFilterKeywordChange = this.onFilterKeywordChange.bind(this);
        this.onFilterRangeChange = this.onFilterRangeChange.bind(this);
        this.updateCols = this.updateCols.bind(this);
        this.updateGoToColumn = this.updateGoToColumn.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // Filters rows by selected column
    filterRowsBy(filterAll, filters) {
        var rows = this.rows.slice();
        var filteredRows = rows.filter(function (row) {
            var allFlag = false; // Current row contains the global keyword
            for (var col in filters) {
                if (!filters[col].hide) {
                    if (filters[col].type == 'STRING') {
                        if (!row[col]) {
                            if (filters[col].key.length > 0) {
                                return false;
                            }
                        } else {
                            if (row[col].toLowerCase().indexOf(filters[col].key.toLowerCase()) < 0) {
                                return false;
                            }
                            if (row[col].toLowerCase().indexOf(filterAll.toLowerCase()) >= 0) {
                                allFlag = true;
                            }
                        }
                    } else if (filters[col].type == 'NUMBER') {
                        if (!row[col] || isNaN(row[col])) {
                        } else {
                            if (Number(row[col]) < filters[col].min) {
                                return false;
                            }
                            if (Number(row[col]) > filters[col].max) {
                                return false;
                            }
                        }
                    }
                }
            }
            return allFlag;
        });

        return filteredRows;
    }

    // Sorts rows by selected column
    sortRowsBy(filteredRows, sortBy, switchDir) {
        var type = this.state.filters[sortBy].type, sortDir = this.state.sortDir, SortTypes = this.props.SortTypes;
        if (switchDir) {
            if (sortBy === this.state.sortBy) {
                sortDir = this.state.sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
            } else {
                sortDir = SortTypes.DESC;
            }
        }

        filteredRows.sort(function (a, b) {
            var sortVal = 0, aVal = a[sortBy], bVal = b[sortBy];
            if (type == 'NUMBER') {
                aVal = (aVal && !isNaN(aVal)) ? Number(aVal) : aVal;
                bVal = (bVal && !isNaN(bVal)) ? Number(bVal) : bVal;
            }
            if (typeof aVal != 'undefined' && !isNaN(aVal) && typeof bVal != 'undefined' && !isNaN(bVal)) {
                if (aVal > bVal) {
                    sortVal = 1;
                }
                if (aVal < bVal) {
                    sortVal = -1;
                }

                if (sortDir === SortTypes.ASC) {
                    sortVal = sortVal * -1;
                }
            } else if (typeof aVal != 'undefined' && typeof bVal != 'undefined') {
                if (!isNaN(aVal)) {
                    sortVal = -1;
                } else if (!isNaN(bVal)) {
                    sortVal = 1;
                }
                else {
                    if (aVal > bVal) {
                        sortVal = 1;
                    }
                    if (aVal < bVal) {
                        sortVal = -1;
                    }

                    if (sortDir === SortTypes.ASC) {
                        sortVal = sortVal * -1;
                    }
                }
            } else if (aVal) {
                sortVal = -1;
            }
            else {
                sortVal = 1;
            }

            return sortVal;
        });

        return {filteredRows: filteredRows, sortDir: sortDir};
    }

    // Sorts and sets state
    sortNSet(sortBy) {
        var result = this.sortRowsBy(this.state.filteredRows, sortBy, true);
        this.setState({
            filteredRows: result.filteredRows,
            sortBy: sortBy,
            sortDir: result.sortDir
        });
    }

    // Filters, sorts and sets state
    filterSortNSet(filterAll, filters, sortBy) {
        var filteredRows = this.filterRowsBy(filterAll, filters);
        var result = this.sortRowsBy(filteredRows, sortBy, false);
        this.setState({
            filteredRows: result.filteredRows,
            sortBy: sortBy,
            sortDir: result.sortDir,
            filterAll: filterAll,
            filters: filters
        });
    }

    // Operations when filter keyword changes
    onFilterKeywordChange(e) {
        var filterAll = this.state.filterAll, filters = this.state.filters;
        if (e.target.getAttribute('data-column') == 'all') {
            filterAll = e.target.value;
        } else {
            filters[e.target.getAttribute('data-column')].key = e.target.value;
        }
        this.filterSortNSet(filterAll, filters, this.state.sortBy);
    }

    // Operations when filter range changes
    onFilterRangeChange(column, min, max) {
        var filters = this.state.filters;
        filters[column].min = min;
        filters[column].max = max;
        this.filterSortNSet(this.state.filterAll, filters, this.state.sortBy);
    }

    updateCols(cols, filters) {
        var filteredRows = this.filterRowsBy(this.state.filterAll, filters);
        var result = this.sortRowsBy(filteredRows, this.state.sortBy, false);
        this.setState({
            cols: cols,
            filteredRows: result.filteredRows,
            filters: filters
        });
    }

    updateGoToColumn(val) {
        this.setState({
            goToColumn: val
        });
    }

    // Initializes filteredRows before first rendering
    componentWillMount() {
        this.filterSortNSet(this.state.filterAll, this.state.filters, this.state.sortBy);
    }

    // Activates range sliders after first rendering
    componentDidMount() {
        var onFilterRangeChange = this.onFilterRangeChange;
        $('.rangeSlider')
            .each(function () {
                var min = Number($(this).attr('data-min')), max = Number($(this).attr('data-max')),
                    column = $(this).attr('data-column');
                $(this).slider({
                    range: true,
                    min: min,
                    max: max,
                    values: [min, max],
                    slide: function (event, ui) {
                        $('#range-' + column).val(ui.values[0] + ' to ' + ui.values[1]);
                        onFilterRangeChange(column, ui.values[0], ui.values[1]);
                    }
                });
                $('#range-' + column).val(min + ' to ' + max);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <TablePrefix cols={this.state.cols} rows={this.rows}
                                 onFilterKeywordChange={this.onFilterKeywordChange}
                                 filters={this.state.filters}
                                 updateCols={this.updateCols}
                                 updateGoToColumn={this.updateGoToColumn}
                                 scroller={this.props.scroller}
                                 filter={this.props.filter}
                                 hideFilter={this.props.hideFilter}
                                 getData={this.props.download}
                                 hider={this.props.showHide}
                    />
                </div>
                <div className="row">
                    <TableMain cols={this.state.cols} filteredRows={this.state.filteredRows}
                               sortNSet={this.sortNSet} onFilterKeywordChange={this.onFilterKeywordChange}
                               goToColumn={this.state.goToColumn} sortBy={this.state.sortBy}
                               sortDirArrow={this.state.sortDir === this.props.SortTypes.DESC ? ' ↓' : ' ↑'}
                               filterAll={this.state.filterAll}
                               filter={this.props.filter}
                    />
                </div>
            </div>
        );
    }
}

EnhancedFixedDatatable.defaultProps = {
    SortTypes: {
        ASC: 'ASC',
        DESC: 'DESC'
    },
    rows: null,
    filter: 'NONE',
    download: 'NONE',
    showHide: false,
    hideFilter: true,
    scroller: false,
    fixed: []
};

export default EnhancedFixedDatatable;
