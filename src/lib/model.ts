interface Entity {
  id: string;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
}

interface User extends Entity {
  name: string;
  login: string;
}

interface UserGroup extends Entity {
  name: string;
}

interface UserGroupMember extends Entity {
  groupId: string;
  userId: string;
}

interface Organization extends Entity {
  name: string;
}

interface Event extends Entity {
  // type: string;
  comment: string;
  // TODO combine into single range and store as PG tsrange
  start: Date;
  end: Date;
}

interface Calendar extends Entity {
  name: string;
  type: string;
}

interface CalendarEvent extends Entity {
  calendarId: string;
  eventId: string;
}
