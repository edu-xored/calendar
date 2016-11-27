import * as React from 'react';
import {User, Team, Calendar, Event} from '../../../lib/model';
import API from '../../api';


const getFormForEntity = (entity: any, formKey: number) => {
  const fields = entity.props.map((prop, index) => {
    return (
      <div className='form-field' key={''+index}>
        <label htmlFor={''+prop}>{ prop }</label>
        <input type='text' id={''+prop}/>
      </div>
    );
  });

  return (
    <form method='POST' key={formKey} onSubmit={entity.onFormSubmit}>
      <p>{`Create entity of type: ${entity.type}`}</p>
      { fields }
      <button type='submit'>{`Add ${entity.type}`}</button>
    </form>
  );
}

const onCalendarFormSubmit = (e) => {
  console.log('Adding a calendar to db');
  e.preventDefault();
  try {
    API.calendars.create({
      name: e.target.name.value.trim(),
      type: e.target.type.value.trim(),
      description: e.target.description.value.trim(),
      teamId: e.target.teamId.value.trim()
    }).then(res => console.log(res));
  } catch(err) {
    console.log(err);
  }
};
const onUserFormSubmit = (e) => {
  e.preventDefault();
  try {
    API.users.create({
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      login: e.target.login.value.trim(),
      role: e.target.role.value.trim(),
      position: e.target.position.value.trim(),
      place: e.target.place.value.trim(),
    }).then(res => console.log(res));
  } catch(err) {
    console.log(err);
  }
};
const onEventFormSubmit = (e) => {
  e.preventDefault();
  };

const  onTeamFormSubmit = (e) => {

  e.preventDefault();
  let allUsers: User[];
  allUsers = API.users.getList()
    .then(
      users => {
        console.log(users);
        return users;
    }).catch(err => {
      console.log("Couldn't load users");
    });

  try {
    API.teams.create({
      name: e.target.name.value.trim(),
      description: e.target.description.value.trim(),
      members: allUsers
    }).then(res => console.log(res));
  } catch(err) {
    console.log(err);
  }

  try {
    API.teams.getList()
    .then(res => console.log(res));
  } catch(err) {
    console.log(err);
  }

};

export default class DBWorker extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let uProps = ['name', 'email', 'login', 'avatar', 'role', 'position', 'place'];
    let tProps = ['name', 'avatar', 'description'];
    let cProps = ['name', 'type', 'description', 'teamId'];
    let eProps = ['type', 'comment', 'calendarId', 'start', 'end', 'userId'];
    const entities = [
      {
        type: 'User',
        props: uProps,
        onFormSubmit: onUserFormSubmit
      },
      {
        type: 'Team',
        props: tProps,
        onFormSubmit: onTeamFormSubmit
      },
      {
        type: 'Event',
        props: eProps,
        onFormSubmit: onEventFormSubmit
      },
      {
        type: 'Calendar',
        props: cProps,
        onFormSubmit: onCalendarFormSubmit
      }
    ];

    const forms = entities.map((entity, key) => getFormForEntity(entity, key));
    return (
      <div>
        { forms }
      </div>
    );
  }
}
