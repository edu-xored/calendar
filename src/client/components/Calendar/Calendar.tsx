import * as React  from 'react';

// __FUNCTION_NAME__ should later be replaced with actual api method
// import { __GET_CALENDAR_DATA__, __GET_TEAM_DATA__, __GET_EVENTS__ } from '../../api';

import { Calendar, Event, Team, User } from '../../../lib/model';
import CalendarGrid from './CalendarGrid';
import Controls from './Controls';
import Filter from './Filter';

interface ICalendarViewState {
  calendar: Calendar,
  data,
  filterKey: string,
  pattern: string
}

export default class CalendarView extends React.Component<any, ICalendarViewState> {

state: ICalendarViewState;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let calendar: Calendar;
    let team: Team;
    let events: Event[];

    // calendar = __GET_CALENDAR_DATA__(this.props.params.id);
    // team = __GET_TEAM_DATA__(calendar.teamId);
    // events = __GET_EVENTS__(this.props.params.id);

    this.setState({
      calendar: {
        id: this.props.params.id,
        name: calendar.name,
        type: calendar.type,
        description: calendar.description,
        teamId: calendar.teamId
      },
      data: this.createDataArray(events, team.members),
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
      </div>
    );
  }

  createDataArray(events: Event[], teamMembers: User[]) {
    return teamMembers.map((tm) => {
      return {
        user: tm,
        events: events.filter((event) => event.createdBy === tm.id)
      };
    });
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

    if (filterKey.length == 0 || pattern.length == 0) {
      return this.state.data;
    }

    return this.state.data.filter((item) => item.user[filterKey].match(pattern));
  }

}
