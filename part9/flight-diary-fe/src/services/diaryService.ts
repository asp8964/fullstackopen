import axios from "axios";
import type { Diary, NewDiary } from "../types";

const baseUrl = "/api/diaries";

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((res) => res.data);
};

export const createDiary = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((res) => res.data);
};
