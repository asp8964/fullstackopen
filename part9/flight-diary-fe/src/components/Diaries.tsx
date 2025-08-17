import type { Diary } from "../types";
type DiariesProps = {
  diaries: Diary[];
};

const Diaries = ({ diaries }: DiariesProps) => {
  return (
    <div>
      <h3>Diary entries</h3>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            <b>{diary.date}</b>
          </p>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default Diaries;
