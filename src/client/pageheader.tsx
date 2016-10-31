import * as React from 'react';
import {Input, Menu, Dropdown, Container} from 'semantic-ui-react';
import {User} from '../lib/model';

interface PageState {
  activeItem: string;
}

interface MenuItem {
  name: string;
  text: string;
  role: boolean | string;
  parent: boolean | string;
  rightSide: boolean;
}

export default class PageHeader extends React.Component<{}, PageState> {
  state: PageState = {
    activeItem: 'home',
  };

  handleItemClick = (name) => this.setState({activeItem: name});
  handleMenuItemClick = (e, {name}) => this.handleItemClick(name);
  handleDropdownItemClick = (e, {value}) => this.handleItemClick(value);

  user: User = {
    id: '1',
    login: '%username%',
    name: '%username%',
    pwdhash: '%username%', // password hash
    avatar: '', // URL to avatar image, e.g. it could be a gravatar URL or URL to uploaded image
    role: 'admin',
    position: '213',
    place: 's',
  }; // TODO fetch real logged in user's information

  menu: MenuItem[] = [
    {
      name: 'home',
      text: 'Home',
      role: false,
      parent: false,
      rightSide: false,
    },
    {
      name: 'calendars',
      text: '',
      role: false,
      parent: false,
      rightSide: false,
    },
    {
      name: 'reports',
      text: 'Reports',
      role: false,
      parent: false,
      rightSide: false,
    },
    {
      name: 'teams',
      text: 'Teams',
      role: false,
      parent: false,
      rightSide: false,
    },
    {
      name: 'admin',
      text: 'Admin',
      role: 'admin',
      parent: false,
      rightSide: false,
    },
    {
      name: 'user',
      text: this.user.name,
      role: true,
      parent: false,
      rightSide: false,
    },
    {
      name: 'account',
      text: 'My account',
      role: true,
      parent: 'user',
      rightSide: false,
    },
    {
      name: 'logout',
      text: 'Logout',
      role: true,
      parent: 'user',
      rightSide: false,
    },
  ];

  showItem(item, child = false) {
    if (item.parent === item.name)
      return;
    if ((item.role === true && +(this.user.id) <= 0) || (item.role && item.role === this.user.role)) // TODO normal check for rights
      return;
    let dropdown = [];
    for (let tmpitem of this.menu)
      if (tmpitem.parent === item.name)
        dropdown.push(this.showItem(tmpitem));
    if (dropdown.length > 0) {
      return (
        <Dropdown as={(child) ? Dropdown.Item : Menu.Item} text={item.text}>
          <Dropdown.Menu>
            {dropdown}
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      if (child)
        return (
          <Dropdown.Item value={item.name} text={item.text} active={this.state.activeItem === item.name}
                         onClick={this.handleDropdownItemClick}/>
        );
      else
        return (
          <Menu.Item name={item.name} active={this.state.activeItem === item.name} onClick={this.handleMenuItemClick}/>
        );
    }
  }

  render() {
    let container = [];
    for (let item of this.menu)
      if (item.parent === false && !item.rightSide)
        container.push(this.showItem(item));
    container.push(
      <Menu.Item position='right'>
        <Input icon='search' placeholder='Search...'/>
      </Menu.Item>
    );
    for (let item of this.menu)
      if (item.parent === false && item.rightSide)
        container.push(this.showItem(item));
    return (
      <Menu><Container>{container}</Container></Menu>
    );
    /*
     <Container>
     <Menu.Item name='home' active={this.state.activeItem === 'home'} onClick={this.handleMenuItemClick} />
     <Menu.Item name='calendars' active={this.state.activeItem === 'calendars'} onClick={this.handleMenuItemClick} />
     <Menu.Item name='reports' active={this.state.activeItem === 'reports'} onClick={this.handleMenuItemClick}/>
     <Menu.Item name='teams' active={this.state.activeItem === 'teams'} onClick={this.handleMenuItemClick}/>
     {this.user.role === 'admin' &&
     <Menu.Item name='admin' active={this.state.activeItem === 'admin'} onClick={this.handleMenuItemClick}/>
     }
     <Menu.Item position='right'>
     <Input icon='search' placeholder='Search...' />
     </Menu.Item>
     <Dropdown as={Menu.Item} text={this.user.name}>
     <Dropdown.Menu>
     <Dropdown.Item value='options' text="My account" active={this.state.activeItem === 'options'} onClick={this.handleDropdownItemClick} />
     <Dropdown.Item value='logout' text="Log Out" active={this.state.activeItem === 'logout'} onClick={this.handleDropdownItemClick} />
     </Dropdown.Menu>
     </Dropdown>
     </Container>
     */
  }
}
