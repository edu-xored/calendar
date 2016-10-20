Short API doc.

# Users
* GET /api/me - get current user
* GET /api/users - list all users
* GET /api/user/:id - get user by id
* PUT /api/user/:id - update user by id
* DELETE /api/user/:id - not needed now

# Teams
* POST /api/teams - create new team
* GET /api/teams - list all teams
* GET /api/team/:id - get team by id
* PUT /api/team/:id - update team by id
* DELETE /api/team/:id - delete specified team
* POST /api/team/:id/members - add/remove team members

# Calendars
* POST /api/calendars - create new calendar
* GET /api/calendars - list all calendars
* GET /api/calendar/:id - get calendar by id
* PUT /api/calendar/:id - update calendar by id
* GET /api/calendar/:id/events - get calendar events
* POST /api/calendar/:id/events - add calendar events
* DELETE /api/events/:id - delete specified event

# Notifications
* GET /api/notifications - get all unread notifications of current user
* POST /api/notifications/markasread - mark as read specified notifications

# Avatars
* GET /api/avatar/:user_id - get avatar image for specified user
* POST /api/avatar - uploads avatar image to server
* GET /api/myavatar - get avatar of current user
* POST /api/myavatar - change avatar of current user
