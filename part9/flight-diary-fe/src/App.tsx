import { useEffect, useState } from "react";
import DiaryForm from "./components/DiaryForm";
import Diaries from "./components/Diaries";
import type { Diary } from "./types";
import { getAllDiaries } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      <Diaries diaries={diaries} />
    </div>
  );
};

export default App;
