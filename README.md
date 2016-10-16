# calendar
Team calendars is a web service to track team working time and manage other events using calendars.

## Basic use cases

* As an employee, I want to authorize to the tracking system.
* As an employee, I want to take PTO.
* As an employee, I want to notify about absence in the office.
* As an employee, I want to mention about extra working day.
* As an employee, I want to request a vacation.
* As a team leader, I want to confirm extra working day of teammate.
* As an accountant, I want to view monthly report.
* As an accountant, I want to apply accounting calendar for particular country.

## Features

### Must have
* [ ] Tracking missed or extra working days
* [ ] LDAP Authentication
* [ ] Easy management of company annual calendars (localized per country)
* [ ] Calendars management
* [ ] Simple tabular reports
* [ ] Admin web interface to manager users, teams, etc
* [ ] Notifications

### Nice to have
* Simple role based access control
* Employee office arrangement
* Search of free workplaces
* Search of users/teams/calendars/events
* Birthday calendar
* Reminders
* Calendar links for sharing
* Import calendars/events from Google Calendar
* Import from Attlasian Confluence Calendars
* Export to CSV, iCalendar document formats

## Development guide

### Get Started

* install [nodejs](https://nodejs.org/en/), we will use latest 6.7 version
* `npm install -g typescript` to install [TypeScript](https://www.typescriptlang.org/) compiler   
* in project directory run `npm install`
* `npm run dev` should start development web server

### Development scripts

Scripts below could be run in project root directory.

* `npm run install-tools` - install dev tools
* `npm run dev` - start development web server
* `npm run build` - build artifacts to run production web server
* `npm start` - start production web server
* `npm run lint` - inspect code with linter(s)
* `npm test` - run automated unit/integration tests

### Tools

* [TypeScript](https://www.typescriptlang.org/)
* [sass](http://sass-lang.com/)
* [React](https://facebook.github.io/react/)
* [webpack](https://webpack.github.io/)

### Source Code Editors

You could use one of the following free editors. 

* [Visual Studio Code](https://code.visualstudio.com)
* [Atom](https://atom.io/)
