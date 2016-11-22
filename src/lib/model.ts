export interface Entity {
  id?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

export interface User extends Entity {
  name: string;
  email?: string;
  login?: string;
  pwdhash?: string; // password hash, available only on server
  avatar?: string; // URL to avatar image, e.g. it could be a gravatar URL or URL to uploaded image
  role?: string;
  position?: string;
  place?: string;
  password?: string; // transient field that could be only sent from client
}

export interface Team extends Entity {
  name: string;
  avatar: string;
  description: string;
  members?: User[]; // only as part of API payload, actually stored in separate association table TeamMembers
}

export interface TeamMember extends Entity {
  teamId: string;
  userId: string;
}

export interface Event extends Entity {
  type: string;
  comment: string;
  calendarId: string;
  start: Date;
  end: Date;
  userId: string;
}

export interface Calendar extends Entity {
  name: string;
  type: string;
  description: string;
  teamId: string;
  team?: Team; // only as part of API payload
  events?: Event[]; // only as part of API payload
}

export interface Notification extends Entity {
  message: string;
  userId: string;
  teamId: string;
}
