import { useState } from "react";

export const useField = () => {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange,
    reset,
  };
};
