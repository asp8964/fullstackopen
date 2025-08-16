import express, { Response } from "express";
import { DiagnosisEntry } from "../types";
import diagnosisService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;
