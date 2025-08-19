import express, { NextFunction, Request, Response } from "express";
import {
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import patientService from "../services/patientService";
import { EntryWithoutIdSchema, newEntrySchema } from "../utils";
import z from "zod";

const newPatient = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newPatientEntry = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntryWithoutIdSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(patientService.getEntryById(id));
});

router.post(
  "/",
  newPatient,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

router.post(
  "/:id/entries",
  newPatientEntry,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res) => {
    console.log(req.body);

    const addedEntry = patientService.addPatientEntry(req.params.id, req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
