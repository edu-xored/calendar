import * as React from 'react';
import { Input, Menu } from 'semantic-ui-react';

interface PageState {
  activeItem: string;
}

export default class Page extends React.Component<{}, PageState> {
  state: PageState = {
    activeItem: 'home',
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item name='calendars' active={activeItem === 'calendars'} onClick={this.handleItemClick} />
        <Menu.Item name='teams' active={activeItem === 'teams'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}
