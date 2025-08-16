import { parseArgsForBmi } from "./utils";

const calculateBmi = (heightStr: string, weightStr: string): string => {
  const height = Number(heightStr);
  const weight = Number(weightStr);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }
  if (height === 0 || weight === 0) {
    throw new Error("height/weight can't be zero!");
  }
  const bmi = weight / (height / 100) ** 2;
  //   console.log(bmi, weight, height);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgsForBmi(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
