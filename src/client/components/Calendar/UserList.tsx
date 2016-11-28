import * as React from 'react';

import Filter from './Filter';
import Row from './Row';

export default class UserList extends React.Component<any, any> {
  componentDidMount() {
    const userList = document.getElementsByClassName('user-list')[0];
    userList.addEventListener('scroll', this.handleOnUserListScroll.bind(this));
  }

  componentWillUnmount() {
    const userList = document.getElementsByClassName('user-list')[0];
    userList.removeEventListener('scroll', this.handleOnUserListScroll.bind(this));
  }
  render() {
    const userList = this.props.data.map((item, index) =>
      <Row
        key={index}
        id={ `user-row-${index}` }
        rowData={ [{type: 'user', content: item.user}] }
        handleOnCellClick={ undefined }
      />
    );

    return (
      <div className='user-list-wrapper'>
        <Filter
          onFilterChange={ this.props.onFilterChange }
          filterText={ this.props.filterText }
        />
        <div className='user-list'>
          <div className='user-list-container'>
          { userList }
          </div>
        </div>
      </div>
    );
  }

  onFilterChange(key, pattern) {
    this.props.onFilterChange(key, pattern);
  }

  handleOnUserListScroll() {
    this.props.syncScrollPosition('user-list');
  }
}
