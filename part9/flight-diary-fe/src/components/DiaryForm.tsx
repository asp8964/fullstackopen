import { useField } from "../hooks/useField";
import type { Diary } from "../types";
import { createDiary } from "../services/diaryService";
import { useState } from "react";
import axios from "axios";

type DiaryFormProps = {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
};

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const { reset: dReset, ...date } = useField("date");
  //   const { reset: vReset, ...visibility } = useField("text");
  //   const { reset: wReset, ...weather } = useField("text");
  const { reset: cReset, ...comment } = useField("text");
  const [message, setMessage] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedWeather, setSelectedWeather] = useState("");
  console.log(selectedVisibility, selectedWeather);

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisibility(e.target.value);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeather(e.target.value);
  };

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary = {
      date: date.value,
      //   visibility: visibility.value,
      //   weather: weather.value,
      visibility: selectedVisibility,
      weather: selectedWeather,
      comment: comment.value,
    };

    createDiary(newDiary)
      .then((addedDiary) => setDiaries(diaries.concat(addedDiary)))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setMessage(error.response?.data);
          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else {
          console.error(error);
        }
      });

    dReset();
    // vReset();
    // wReset();
    cReset();
    setSelectedVisibility("");
    setSelectedWeather("");
  };
  return (
    <form onSubmit={diaryCreation}>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{message}</div>
      <div>
        <label>date</label>
        <input {...date} />
      </div>
      <div>
        <label>visibility</label> <label htmlFor="great">great</label>
        <input
          type="radio"
          id="great"
          value="great"
          checked={selectedVisibility === "great"}
          onChange={handleVisibilityChange}
        />
        <label htmlFor="good">good</label>
        <input
          type="radio"
          id="good"
          value="good"
          checked={selectedVisibility === "good"}
          onChange={handleVisibilityChange}
        />
        <label htmlFor="ok">ok</label>
        <input
          type="radio"
          id="ok"
          value="ok"
          checked={selectedVisibility === "ok"}
          onChange={handleVisibilityChange}
        />
        <label htmlFor="poor">poor</label>
        <input
          type="radio"
          id="poor"
          value="poor"
          checked={selectedVisibility === "poor"}
          onChange={handleVisibilityChange}
        />
      </div>
      <div>
        <label>weather</label> <label htmlFor="sunny">sunny</label>
        <input
          type="radio"
          id="sunny"
          value="sunny"
          checked={selectedWeather === "sunny"}
          onChange={handleWeatherChange}
        />
        <label htmlFor="rainy">rainy</label>
        <input
          type="radio"
          id="rainy"
          value="rainy"
          checked={selectedWeather === "rainy"}
          onChange={handleWeatherChange}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input
          type="radio"
          id="cloudy"
          value="cloudy"
          checked={selectedWeather === "cloudy"}
          onChange={handleWeatherChange}
        />
        <label htmlFor="stormy">stormy</label>
        <input
          type="radio"
          id="stormy"
          value="stormy"
          checked={selectedWeather === "stormy"}
          onChange={handleWeatherChange}
        />
        <label htmlFor="windy">windy</label>
        <input
          type="radio"
          id="windy"
          value="windy"
          checked={selectedWeather === "windy"}
          onChange={handleWeatherChange}
        />
        {/* <input {...weather} /> */}
      </div>
      <div>
        <label>comment</label>
        <input {...comment} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default DiaryForm;
