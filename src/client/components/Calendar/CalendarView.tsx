import * as _ from 'lodash';
import * as React  from 'react';

import API from '../../api';

import { Form, Button, Header, Modal } from 'semantic-ui-react';

import { Calendar, Event, Team, User } from '../../../lib/model';
import CalendarGrid from './CalendarGrid';
import Controls from './Controls';
import UserList from './UserList';
import EventModal from './EventModal';
import Constants from '../constants';

import DBWorker from './DBWorker';

interface ICalendarViewState {
  calendar: Calendar;
  data: any;
  filterKey: string;
  pattern: string;
  showEventModal: boolean;
  eventModalAction: string;
  currentMonth: number;
  currentYear: number;
};

const defaultState = {
  calendar: null,
  data: [],
  filterKey: '',
  pattern: '',
  showEventModal: false,
  eventModalAction: null,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear()
};

async function fetchCalendarData(calendarId: string) : Promise<any> {
  try {
    const calendar = await API.calendars.get(calendarId);
    const team = await API.teams.getMembers(calendar.teamId);
    const allEvents = await API.events.getList();

    const events = allEvents.filter(e => (e.calendarId == calendarId));

    return { calendar, team, events };
  } catch(err) {
    console.log(err);
    return null;
  }
}

// constants to sync DOM elements' scroll
const USER_LIST_CLASS_NAME = 'user-list';
const GRID_CLASS_NAME = 'grid-body';

const headerLength = 31;

export default class CalendarView extends React.Component<any, ICalendarViewState> {

static mouseOnElement: string = null;
state: ICalendarViewState = defaultState;
static contextTypes = {
  router: React.PropTypes.object
}

  componentDidMount() {
    let calendar: Calendar;
    let team: User[];
    let events: Event[];

    document
      .getElementsByClassName(GRID_CLASS_NAME)[0]
      .addEventListener('mouseover', () => { CalendarView.mouseOnElement = GRID_CLASS_NAME });

    document
      .getElementsByClassName(USER_LIST_CLASS_NAME)[0]
      .addEventListener('mouseover', () => { CalendarView.mouseOnElement = USER_LIST_CLASS_NAME });

    const calendarId = (this.context as any).router.params.id;
    fetchCalendarData(calendarId)
    .then(res => {
      ({ calendar, team, events } = res);
      this.setState(Object.assign({}, this.state,
        {
          calendar: calendar,
          data: this.createDataArray(events, team)
        })
      );
    })
    .catch(err => {
      console.log('Coundn\'t fetch calendar from server. Error: ' + err);
      calendar = team = events = null;
    });
  }

  render() {
    let data = this.filterData();
    console.log('state data: ', data);

    return (
      <div className='calendar-view-wrapper'>
        <div className='calendar-view'>
          <section className='left-col'>
            <UserList
              data={ data }
              filterText={ this.state.pattern }
              onFilterChange={ this.setFilterParams.bind(this) }
              syncScrollPosition={ this.syncScrollPosition.bind(this) }
            />
          </section>
          <section className='right-col'>
            <Controls
              currentMonth={ this.state.currentMonth }
              currentYear={ this.state.currentYear }
            />
            <CalendarGrid
              gridWidth={ new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate() }
              data={ data }
              handleOnEventCellClick={ this.showEventModal.bind(this) }
              syncScrollPosition={ this.syncScrollPosition.bind(this) }
            />
          </section>
        </div>

        { this.state.showEventModal &&
          <EventModal
            action={ this.state.eventModalAction }
            onFormSubmit={ this.onEventSubmit.bind(this) }
            onCloseEventModal={ this.closeEventModal.bind(this) }
            onHideEventModal={ this.hideEventModal.bind(this) }
          />
        }
      </div>
    );
  }

  createDataArray(events: Event[], teamMembers: User[]) {
    if (events == null || teamMembers == null) {
      return null;
    }

    return teamMembers.map((tm) => ({
        user: tm,
        events: events.filter((event) => (event.userId == tm.id))
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
    return this.state.data.filter((item) => item.user[filterKey].match(new RegExp(pattern, 'i')));
  }

  showEventModal(action: string) {
    if (action == Constants.ADD_NEW_EVENT) {
      this.setState(Object.assign(
        { showEventModal: true, eventModalAction: action }
      ));
    }
  }

  hideEventModal() {

  }

  closeEventModal() {
    this.setState(Object.assign(
      { showEventModal: false, eventModalAction:null }
    ));
  }

  onEventSubmit({eventTitle, eventComment, eventStart, eventEnd}) {
    if (this.state.eventModalAction == Constants.ADD_NEW_EVENT) {
      API.events.create({
        calendarId: (this.context as any).router.params.id,
        type: eventTitle,
        comment: eventComment,
        start: eventStart,
        end: eventEnd,
        userId: '1'
      }).then(() => {
        console.log("Form has been submitted successfully");
      }).catch((err) => {
        console.log("Error while creating event. " + err);
      });

      // remove these lines
      API.events.getList()
      .then(events => {console.log('events:', events)})
      .catch(err => {console.log(err)});
    }

  }

  syncScrollPosition(eventTrigger: string) {
    const userList = document.getElementsByClassName(USER_LIST_CLASS_NAME)[0];
    const grid = document.getElementsByClassName(GRID_CLASS_NAME)[0];

      if (CalendarView.mouseOnElement == USER_LIST_CLASS_NAME) {
        grid.scrollTo(0, userList.scrollTop);
      }
      else if (CalendarView.mouseOnElement == GRID_CLASS_NAME) {
        userList.scrollTo(0, grid.scrollTop);
      }
  }
}
