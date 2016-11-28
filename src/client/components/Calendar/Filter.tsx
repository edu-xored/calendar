import * as React from 'react';

import { Input, Label } from 'semantic-ui-react';

export default class Filter extends React.Component<any, any> {
  render() {
    return (
      <div className='user-list-filter'>
        <Input
          focus
          icon='search'
          type='text'
          placeholder="Find users.."
          onChange={ this.onFilterChange.bind(this) }
        />
      </div>
    );
  }

  onFilterChange(event) {
    const filterString: string = event.target.value.trim();
    console.log(filterString);
    this.props.onFilterChange('name', filterString);
  }
}
