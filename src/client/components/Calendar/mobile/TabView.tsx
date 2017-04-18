import * as React from 'react';

import TabBar from './TabBar';
import StatusTab from './StatusTab';

class TabView extends React.Component<any, any> {
  render() {
    return (
      <div className="tab-view" >
        <TabBar />
        <StatusTab />
      </div>
    );
  }
}

export default TabView;
