import * as _ from 'lodash';
import * as React  from 'react';

import api from '../../api';

import { Calendar, Event, Team, User } from '../../../lib/model';
import CalendarGrid from './CalendarGrid';
import Controls from './Controls';
import Filter from './Filter';

import DBWorker from './DBWorker';

interface ICalendarViewState {
  calendar: Calendar;
  data: any;
  filterKey: string;
  pattern: string;
};

const defaultCalendar = {
  id: '',
  name: '',
  type: '',
  description: '',
  organizationId: '',
  teamId: ''
};

const defaultState = {
  calendar: defaultCalendar,
  data: [],
  filterKey: '',
  pattern: ''
};

async function fetchCalendarData(calendarId: string) : Promise<any> {
  try {
    const calendar = await api.calendars.get(calendarId);
    const team = await api.teams.getMembers(calendar.teamId);
    const allEvents = await api.events.getList();

    let events = allEvents.filter(e => (e.calendarId === calendarId));


    return { calendar, team, events:null };
  } catch(err) {
    console.log(err);
    return null;
  }
}

export default class CalendarView extends React.Component<any, ICalendarViewState> {

state: ICalendarViewState = defaultState;
static contextTypes = {
  router: React.PropTypes.object
}

  constructor(props) {
    super(props);
    /*
    try {
      api.calendars.create({
        id: '2',
        name: 'TestCalendar',
        type: 'some type',
        description: 'This is the first calendar in our database!',
        teamId: '2'
      }).then(res => console.log(res));
    } catch(err) {
      console.log(err);
    }
    */
  }

  componentDidMount() {
    let calendar: Calendar;
    let team: User[];
    let events: Event[];

    const id = (this.context as any).router.params.id;
    fetchCalendarData(id)
    .then(res => { console.log(res); ({ calendar, team, events } = res); })
    .catch(err => {
      console.log('Coundn\'t fetch calendar from server. Error: ' + err);
      calendar = team = events = null;
    });

    this.setState({
      calendar: calendar,
      data: this.createDataArray(events, team),
      filterKey: '',
      pattern: ''
    });
  }

  render() {
    let data = this.filterData();

    return (
      <div className='calendar-view'>
        <section className='top-row'>
          <Filter
            onFilterChange={ this.setFilterParams }
            filterText={ this.state.pattern }
          />
          <Controls />
        </section>
        <section className='bottom-row'>
          <CalendarGrid data={ data }/>
        </section>

        <DBWorker />
      </div>
    );
  }

  createDataArray(events: Event[], teamMembers: User[]) {
    if (events == null || teamMembers == null) {
      return null;
    }

    return teamMembers.map((tm) => ({
        user: tm,
        events: events.filter((event) => (event.createdBy === tm.id))
      })
    );
  }

  setFilterParams(key: string, pattern: string) {
    this.setState(Object.assign({}, this.state,
      {
        filterKey: key,
        pattern: pattern.trim()
      }
    ));
  }

  // add TimeOut block to reduce number of method calls?
  filterData() {
    let filterKey = this.state.filterKey;
    let pattern = this.state.pattern;

    if (this.state.data === null || _.isEmpty(filterKey) || _.isEmpty(pattern)) {
      return this.state.data;
    }
    return this.state.data.filter((item) => item.user[filterKey].match(pattern));
  }
}
