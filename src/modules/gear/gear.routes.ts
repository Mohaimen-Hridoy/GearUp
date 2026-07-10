import { Role } from "@prisma/client";
import { Router } from "express";
import {
  createGear,
  deleteGear,
  getAllGear,
  getGearById,
  updateGear,
} from "./gear.controller";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { createGearSchema, gearIdParamsSchema, getAllGearSchema, updateGearSchema } from "./gear.validation";

const router = Router();

router.get("/", validateRequest(getAllGearSchema), getAllGear);
router.get("/:id", validateRequest(gearIdParamsSchema), getGearById);
router.post("/", auth(Role.PROVIDER), validateRequest(createGearSchema), createGear);
router.put("/:id", auth(Role.PROVIDER), validateRequest(gearIdParamsSchema), validateRequest(updateGearSchema), updateGear);
router.delete("/:id", auth(Role.PROVIDER), validateRequest(gearIdParamsSchema), deleteGear);

export const gearRoutes = router;
