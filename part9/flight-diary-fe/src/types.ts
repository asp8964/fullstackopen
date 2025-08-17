export interface Diary {
  id: string;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;
