import { Router } from "express";
import * as methods from "../controller/microbus.controller.ts";
import { validateMicrobus } from "../middleware/microbus.validation.ts";
export const busRouter = Router();

busRouter.get("/", methods.getAllBusses);

busRouter.post("/",validateMicrobus, methods.addNewBus);

busRouter.get("/rate/:id", methods.getBusRatingByName);

busRouter.get("/filter", methods.getMaxFare);

busRouter.get("/:id", methods.getBusById);

busRouter.put("/:id",validateMicrobus, methods.updateBusById);

busRouter.delete("/:id", methods.removeBusById);
