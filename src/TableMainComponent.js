'use strict';

import React from 'react';
import 'qtip2';
import QtipWrapper from './QtipWrapperComponent';
import Filter from './FilterComponent';
import HeaderWrapper from './HeaderWrapperComponent';
import {Table, Column, ColumnGroup, Cell} from 'fixed-data-table';

class TableMainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.rowGetter = this.rowGetter.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
    }

    // Gets the rows for current rendering
    rowGetter(rowIndex) {
        return this.props.filteredRows[rowIndex];
    }

    // React-renderable content for cells
    renderCell(cellData, _1, _2, _3, columnData) {
        var flag = (cellData && columnData.filterAll.length > 0) ?
            (cellData.toLowerCase().indexOf(columnData.filterAll.toLowerCase()) >= 0) : false;
        return (
            <span style={flag ? {backgroundColor:'yellow'} : {}}>
                <QtipWrapper rawLabel={cellData}/>
            </span>
        );
    }

    // Creates Qtip
    createQtip() {
        $('.hasQtip').one('mouseenter', function () {
            $(this).qtip({
                content: {text: $(this).attr('data-qtip')},
                hide: {fixed: true, delay: 100},
                show: {ready: true},
                style: {classes: 'qtip-light qtip-rounded qtip-shadow', tip: true},
                position: {my: 'center left', at: 'center right', viewport: $(window)}
            });
        });
    }

    // Creates Qtip after first rendering
    componentDidMount() {
        this.createQtip();
    }

    // Creates Qtip after update rendering
    componentDidUpdate() {
        this.createQtip();
    }

    // Creates Qtip after page scrolling
    onScrollEnd() {
        this.createQtip();
    }

    // Destroys Qtip before update rendering
    componentWillUpdate() {
        $('.hasQtip')
            .each(function () {
                $(this).qtip('destroy', true);
            });
    }

    // FixedDataTable render function
    render() {
        var props = this.props;

        var rows = this.props.filteredRows;

        return (
            <div className="col-md-12">
                <Table
                    rowHeight={30}
                    onScrollEnd={this.onScrollEnd}
                    rowsCount={props.filteredRows.length}
                    width={1100}
                    maxHeight={500}
                    headerHeight={30}
                    groupHeaderHeight={50}
                    scrollToColumn={props.goToColumn}
                >
                    {
                        props.cols.map(function (col) {
                            return (
                                <ColumnGroup
                                    header={
                                    <Filter type={col.type} name={col.name}
                                    max={col.max} min={col.min}
                                    onFilterKeywordChange={props.onFilterKeywordChange}
                                    />
                                }
                                    fixed={col.fixed}
                                    align="center"
                                >
                                    <Column
                                        header={
                                        <HeaderWrapper cellDataKey={col.name} columnData={{displayName:col.displayName,sortFlag:props.sortBy === col.name,
                                    sortDirArrow:props.sortDirArrow,filterAll:props.filterAll,type:col.type}}
                                        sortNSet={props.sortNSet} filter={props.filter}
                                        />
                                    }
                                        cell={<MyCell data={rows}  field={col.name} filterAll={props.filterAll}/>}
                                        width={col.show ? 200 : 0}
                                        fixed={col.fixed}
                                        allowCellsRecycling={true}
                                    />
                                </ColumnGroup>
                            );
                        })
                    }
                </Table>
            </div>
        );
    }
}

class MyCell extends React.Component {
    render() {
        var {rowIndex, data, field, filterAll} = this.props;
        var flag = (data[rowIndex][field] && filterAll.length > 0) ?
            (data[rowIndex][field].toLowerCase().indexOf(filterAll.toLowerCase()) >= 0) : false;
        return (
            <Cell
                columnKey={field}
            >
                <span style={flag ? {backgroundColor:'yellow'} : {}}>
                    <QtipWrapper rawLabel={data[rowIndex][field]}/>
                </span>
            </Cell>
        );
    }
}

TableMainComponent.displayName = 'TableMainComponent';

// Uncomment properties you need
// TableMainComponent.propTypes = {};
// TableMainComponent.defaultProps = {};

export default TableMainComponent;
