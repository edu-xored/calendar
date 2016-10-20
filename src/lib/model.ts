export interface Entity {
  id: string;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;
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
  team_id: string;
  user_id: string;
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
  calendar_id: string;
  eventId: string;
}

export interface Notification extends Entity {
  message: string;
  user_id: string;
  team_id: string;
}
