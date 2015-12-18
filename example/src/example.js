var React = require('react');
var ReactDOM = require('react-dom');
var EnhancedFixedDatatable = require('react-enhanced-fixed-datatable');
var $ = require('jquery');

$.getJSON('test_data.json', function (json) {
    var App = React.createClass({
        render () {
            return (
                <div>
                    <EnhancedFixedDatatable input={json} filter='ALL' download='ALL' showHide={true}
                                            hideFilter={true} scroller={false} fixed={['id', 2]}
                                            uniqueId='id'/>, document.getElementById('app')
                </div>
            );
        }
    });

    ReactDOM.render(<App />, document.getElementById('app'));
});
