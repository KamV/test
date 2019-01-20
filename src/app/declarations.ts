export interface IAuth {
  user: IUser;
}

export interface IUser {
  token: string;
  email: string;
  name: string;
}

export interface ISearchResult {
  items: IQuestion[];
}

export interface IQuestion {
  question_id: number;
  tags: string[];
  owner: IOwner;
  answer_count: number;
  last_activity_date: number;
  title: string;
}

export interface IAnswers {
  items: IAnswer[];
}

export interface IAnswer {
  answer_id: number;
  owner: IOwner;
  score: number;
  body: string;
}

export interface IOwner {
  user_id: number;
  display_name: string;
}
