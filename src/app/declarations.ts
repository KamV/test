export interface User {
  id: number;
  email: string;
  nickname: string;
}

export interface SearchResult {
  items: Question[];
}

export interface Question {
  question_id: number;
  tags: string[];
  owner: Owner;
  answer_count: number;
  last_activity_date: number;
  title: string;
}

export interface Answers {
  items: Answer[];
}

export interface Answer {
  answer_id: number;
  tags: string[];
  owner: Owner;
  answer_count: number;
  last_activity_date: number;
  body: string;
}

export interface Owner {
  user_id: number;
  display_name: string;
}
