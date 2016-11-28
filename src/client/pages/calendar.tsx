import * as React from 'react';

import CalendarView from '../components/Calendar/CalendarView';
import { Container } from 'semantic-ui-react';

const CalendarPage = () => (
  <Container className="container-content">
    This is a blank calendar page
    <CalendarView />
  </Container>
);

export default CalendarPage;
