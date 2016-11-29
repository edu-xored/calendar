import * as React from 'react';

import CalendarView from '../components/Calendar/CalendarView';
import { Container } from 'semantic-ui-react';

const CalendarPage = () => (
  <Container className="container-content">
    <CalendarView />
  </Container>
);

export default CalendarPage;
