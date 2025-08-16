import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    return res.status(400).json({ error: "malformatted parameters" }).end();
  }
  try {
    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
  } catch (error) {
    // console.log(error)
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message }).end();
    }
    return res.status(400).send({ error: "malformatted parameters" }).end();
  }
});

app.post("/exercises", (req, res) => {
  // console.log(req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // console.log(daily_exercises, target);

  if (daily_exercises === undefined || target === undefined) {
    return res
      .status(400)
      .json({
        error: "parameters missing",
      })
      .end();
  }

  const targetValue = Number(target);
  const dailyValue = Array.isArray(daily_exercises)
    ? daily_exercises.map(Number).filter((v) => !isNaN(v))
    : null;

  if (isNaN(targetValue) || !dailyValue) {
    return res
      .status(400)
      .json({
        error: "malformatted parameters",
      })
      .end();
  }
  try {
    const result = calculateExercises(targetValue, dailyValue);
    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({
          error: error.message,
        })
        .end();
    }
    return res
      .status(400)
      .json({
        error: "malformatted parameters",
      })
      .end();
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// response.end(JSON.stringify(notes))
