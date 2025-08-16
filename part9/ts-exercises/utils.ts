interface BodyValue {
  height: string;
  weight: string;
}

interface ExerciseValue {
  targetValue: number;
  dailyValue: number[];
}

// export const parseArguments = (args: string[]): bodyValue | exerciseValue => {
//   console.log(args)
//   //   if (args.length < 2) throw new Error('Filename is required')
//   if (args.length < 4) throw new Error('Not enough arguments')
//   switch (args[1]) {
//     case 'bmiCalculator.ts':
//       return parseArgsForBmi(args)
//     case 'exerciseCalculator.ts':
//       return parseArgsForExercise(args)
//     default:
//       throw new Error('Not support Filename')
//   }
// }

export const parseArgsForBmi = (args: string[]): BodyValue => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  return {
    height: args[2],
    weight: args[3],
  };
};

export const parseArgsForExercise = (args: string[]): ExerciseValue => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const [, , targetStrValue, ...dailyStrValue] = args;
  const targetValue = Number(targetStrValue);
  const dailyValue = dailyStrValue.map(Number);
  if (isNaN(Number(targetValue)) || dailyValue.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    targetValue,
    dailyValue,
  };
};
