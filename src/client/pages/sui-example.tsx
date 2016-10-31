import * as React from 'react';
import {Input, Menu, Dropdown, Container} from 'semantic-ui-react';
import {User} from '../../lib/model';

interface PageState {
  activeItem: string;
}

interface MenuItem {
  name: string;
  text: string;
  role: boolean | string;
  parent: boolean | string,
  rightSide: boolean,
}
interface MenuItems extends Array<MenuItem>{}

export default class Page extends React.Component<{}, PageState> {
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
  };//TODO fetch real logged in user's information

  menu: MenuItems = [
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

  showItem (item, child = false) {
    if ((item.role === true && this.user.id) || (item.role && item.role == this.user.role))//TODO normal check for rights
      return;
    var dropdown = <Dropdown.Menu />;
    for (var tmpitem in this.menu)
      if (tmpitem.parent == item.name)
        dropdown.addChild(this.showItem(item));
    if (dropdown.numberOfItems > 0) {
      return (
        <Dropdown as={(child)? Dropdown.Item: Menu.Item} text={item.name}>
          {dropdown}
        </Dropdown>
      )
    } else {
      if (child)
        return (
          <Dropdown.Item value={item.name} active={this.state.activeItem === item.name} onClick={this.handleDropdownItemClick} />
        )
      else
        return (
          <Menu.Item name={item.name} text={item.text} active={this.state.activeItem === item.name} onClick={this.handleMenuItemClick}/>
        )
    }
  }

  render() {

    var container = <Container/>;
    for (var item in this.menu)
      if (item.parent == false && !item.rightSide)
        container.addChild(this.showItem(item));
    container.addChild(
      <Menu.Item position='right'>
        <Input icon='search' placeholder='Search...' />
      </Menu.Item>
    );
    for (var item in this.menu)
      if (item.parent == false && item.rightSide)
        container.addChild(this.showItem(item));
    return (
      <Menu>{container}</Menu>
    );
    /*
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
     */
  }
}
