import * as React from 'react';
import { Input, Menu, Dropdown, Container } from 'semantic-ui-react';

interface PageState {
  activeItem: string;
}

export default class Page extends React.Component<{}, PageState> {
  state: PageState = {
    activeItem: 'home',
  };

  items = {};

  handleItemClick = (name) => this.setState({ activeItem: name });
  handleMenuItemClick = (e, { name }) => this.handleItemClick(name);
  handleDropdownItemClick = (e, { value }) => this.handleItemClick(value);

  render() {
    const { activeItem } = this.state;

    const user =  {
      id: '',
      name: '%username%',
      login: '',
      role: 'admin',
    };//TODO fetch real logged in user's information
    return (
      <Menu>
        <Container>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleMenuItemClick} />
          <Menu.Item name='calendars' active={activeItem === 'calendars'} onClick={this.handleMenuItemClick} />
          <Menu.Item name='reports' active={activeItem === 'reports'} onClick={this.handleMenuItemClick}/>
          <Menu.Item name='teams' active={activeItem === 'teams'} onClick={this.handleMenuItemClick}/>
          {user.role === 'admin' &&
          <Menu.Item name='admin' active={activeItem === 'admin'} onClick={this.handleMenuItemClick}/>
          }
          <Menu.Item position='right'>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Dropdown as={Menu.Item} text={user.name}>
            <Dropdown.Menu>
              <Dropdown.Item value='options' text="My account" active={activeItem === 'options'} onClick={this.handleDropdownItemClick} />
              <Dropdown.Item value='logout' text="Log Out" active={activeItem === 'logout'} onClick={this.handleDropdownItemClick} />
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    );
  }
}
