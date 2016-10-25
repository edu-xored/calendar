export interface Entity {
  id: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface User extends Entity {
  name: string;
  login: string;
}

export interface Team extends Entity {
  name: string;
}

export interface TeamMember extends Entity {
  groupId: string;
  userId: string;
}

export interface Organization extends Entity {
  name: string;
}

export interface Event extends Entity {
  // type: string;
  comment: string;
  // TODO combine into single range and store as PG tsrange
  start: Date;
  end: Date;
}

export interface Calendar extends Entity {
  name: string;
  type: string;
}

export interface CalendarEvent extends Entity {
  calendarId: string;
  eventId: string;
}
