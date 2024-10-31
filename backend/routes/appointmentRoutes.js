import express from "express";
import {
  getAppointments,
  getAppointmentsByPatientId,
  createAppointment,
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", getAppointments);
router.get("/:patientId", getAppointmentsByPatientId);
router.post("/", createAppointment);

export default router;
