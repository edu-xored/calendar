import * as React from 'react';
import {User, Team, Calendar, Event} from '../../../lib/model';
import api from '../../api';


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
  alert('WORKS!!!');
  e.preventDefault();
  try {
    api.calendars.create({
      id: e.target.id,
      name: e.target.name,
      type: e.target.type,
      description: e.target.description,
      teamId: e.target.teamId
    }).then(res => console.log(res));
  } catch(err) {
    console.log(err);
  }
};
const onUserFormSubmit = (e) => {

};
const onEventFormSubmit = (e) => {

};
const onTeamFormSubmit = (e) => {

};

export default class DBWorker extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    let uProps = ['id', 'name', 'email', 'login', 'pwdhash', 'avatar', 'role', 'position', 'place'];
    let tProps = ['id', 'name', 'avatar', 'description'];
    let cProps = ['id', 'name', 'type', 'description', 'teamId'];
    let eProps = ['id', 'type', 'comment', 'calendarId', 'start', 'end', 'userId'];
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
