export interface Entity {
  id: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface User extends Entity {
  name: string;
  login?: string;
  pwdhash?: string; // password hash
  avatar?: string; // URL to avatar image, e.g. it could be a gravatar URL or URL to uploaded image
  role?: string;
  position?: string;
  place?: string;
}

export interface Team extends Entity {
  name: string;
  avatar: string;
  description: string;
  members?: User[]; // only as part of API payload, actually stored in separate association table TeamMembers
}

export interface TeamMember {
  id: string;
  createdAt?: Date;
  createdBy?: string;
  teamId: string;
  userId: string;
}

export interface Organization extends Entity {
  name: string;
  avatar: string;
  description: string;
  teams: Team[];
}

export interface Event extends Entity {
  type: string;
  comment: string;
  createdFor: string;
  start: Date;
  end: Date;
  userId: string;
}

export interface Calendar extends Entity {
  name: string;
  type: string;
  description: string;
  organizationId: string;
  teams: Team[];
  events?: Event[]; // only as part of API payload, actually stored in separate association table CalendarEvents
}

export interface CalendarEvent {
  id: string;
  createdAt?: Date;
  createdBy?: string;
  calendarId: string;
  eventId: string;
}

export interface Notification extends Entity {
  message: string;
  userId: string;
  teamId: string;
}
