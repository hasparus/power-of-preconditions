// #region
import { Flavor } from "nom-ts";

export type Username = Flavor<string, "Username">;
export type Email = Flavor<string, "Email">;

export interface User {
  name: Username;
  email: Email;
}

export type Id = Flavor<string | number, "Id">;
// #endregion

export interface Meeting {
  id: Id;
  author: User;
  title: string;
  published_at?: Date;
  created_at: Date;
}

declare const meeting: Meeting;

// ts(2551) -- bit easier to notice mistake now, huh?
const authorName = meeting.autor.name;
