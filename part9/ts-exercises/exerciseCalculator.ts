import { parseArgsForExercise } from "./utils";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  targetValue: number,
  dailyValue: number[]
): ExerciseResult => {
  const dailyValueLength = dailyValue.length;
  const average =
    dailyValue.reduce((total, value) => (total += value), 0) / dailyValueLength;
  const rating =
    average >= targetValue ? 3 : average >= targetValue * 0.8 ? 2 : 1;

  const baseReult = {
    periodLength: dailyValueLength,
    trainingDays: dailyValue.filter((v) => v !== 0).length,
    success: average >= targetValue,
    target: targetValue,
    average: average,
    rating: rating,
  };
  switch (rating) {
    case 1:
      return {
        ...baseReult,
        ratingDescription: "bad",
      };
    case 2:
      return {
        ...baseReult,
        ratingDescription: "not too bad but could be better",
      };
    case 3:
      return {
        ...baseReult,
        ratingDescription: "excellent, you've reached the goal",
      };
    default:
      throw new Error("Invalid rating");
  }
};

if (require.main === module) {
  try {
    const { targetValue, dailyValue } = parseArgsForExercise(process.argv);
    console.log(calculateExercises(targetValue, dailyValue));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
