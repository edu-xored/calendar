import * as React from 'react';
import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import StatusList from './StatusList';
import ActionBar from './ActionBar';

class StatusTab extends React.Component <any, any> {

    render() {
      const showActionBar = this.props.showActionBar;

      return (
        <div className="status-tab">
          <CalendarView />
          { showActionBar ? <ActionBar /> : <StatusList /> }
        </div>
      );
    }

}

export default connect(StatusTab);
