'use strict';

import React from 'react';
import 'qtip2';

class QtipWrapperComponent extends React.Component {
    render() {
        var label = this.props.rawLabel, qtipFlag = false;
        if (label && label.length > 20) {
            qtipFlag = true;
            label = label.substring(0, 20) + '...';
        }
        return (
            <span className={qtipFlag?'hasQtip':''} data-qtip={this.props.rawLabel}>
                {label}
            </span>
        );
    }
}

QtipWrapperComponent.displayName = 'QtipWrapperComponent';

// Uncomment properties you need
// QtipWrapperComponent.propTypes = {};
// QtipWrapperComponent.defaultProps = {};

export default QtipWrapperComponent;
