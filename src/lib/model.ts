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
}

export interface TeamMember extends Entity {
  teamId: string;
  userId: string;
}

export interface Organization extends Entity {
  name: string;
  avatar: string;
  description: string;
}

export interface Event extends Entity {
  type: string;
  comment: string;
  start: Date;
  end: Date;
}

export interface Calendar extends Entity {
  name: string;
  type: string;
  description: string;
}

export interface CalendarEvent extends Entity {
  calendarId: string;
  eventId: string;
}

export interface Notification extends Entity {
  message: string;
  userId: string;
  teamId: string;
}
