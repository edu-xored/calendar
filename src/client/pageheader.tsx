import * as _ from 'lodash';
import * as React from 'react';
import {Input, Menu, Dropdown, Container} from 'semantic-ui-react';
import history from './history';

interface PageState {
  activeItem: string;
}

interface MenuItem {
  name: string;
  text: string;
  link?: string;
  rightSide?: boolean;
  items?: MenuItem[];
}

const menu: MenuItem[] = [
  {
    name: 'dashboard',
    text: 'Dashboard',
    link: '/',
  },
  {
    name: 'users',
    text: 'Users',
    link: '/admin/users'
  },
  {
    name: 'teams',
    text: 'Teams',
    link: '/admin/teams'
  },
  {
    name: 'calendars',
    text: 'Calendars',
    link: '/admin/calendars',
  },
  {
    name: 'reports',
    text: 'Reports',
    link: '/reports',
  },
  {
    name: 'usercalendar',
    text: 'UserCalendar',
    link: '/usercalendar',
  }
  /*
  {
    name: 'user',
    text: 'User Name',
    items: [
      {
        name: 'account',
        text: 'My Profile',
      },
      {
        name: 'logout',
        text: 'Logout',
      }
    ],
  }
  */
];

export default class PageHeader extends React.Component<{}, PageState> {
  render() {
    const items = _.map(menu, t => this.renderItem(t));
    return (
      <Menu>
        <Container>
          {items}
          <Menu.Item position='right'>
            <Input icon='search' placeholder='Search...'/>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }

  renderItem(item: MenuItem, isDropdown?: boolean) {
    if (!_.isEmpty(item.items)) {
      const content = _.map(item.items, t => this.renderItem(t, true));
      return (
        <Dropdown key={item.name} as={isDropdown ? Dropdown.Item : Menu.Item} text={item.text}>
          <Dropdown.Menu>
            {content}
          </Dropdown.Menu>
        </Dropdown>
      );
    }

    // TODO determine active state from current route
    const active = false;
    const onClick = this.makeItemClickHandler(item);

    if (isDropdown) {
      return (
        <Dropdown.Item key={item.name} value={item.name} text={item.text} active={active}
                       onClick={onClick} />
      );
    }

    return (
      <Menu.Item key={item.name} name={item.name} active={active} onClick={onClick}>
        {item.text}
      </Menu.Item>
    );
  }

  makeItemClickHandler(item: MenuItem) {
    return (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (item.link) {
        history.push(item.link);
        return;
      }
    };
  }
}
