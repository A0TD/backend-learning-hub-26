import { type Request, type Response, type NextFunction } from "express";

export function validateMicrobus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.body || !req.body.bus)
    return res.status(400).send("Invalid request body!");

  const { driverName, route, farePerSeat, seatsAvailable } = req.body.bus;
  const isUpdate = req.method === "PUT";

  if (!isUpdate) {
    if (
      driverName === undefined ||
      route === undefined ||
      farePerSeat === undefined ||
      seatsAvailable === undefined
    )
      return res.status(400).send("Missing microbus data!");
  }

  if (
    farePerSeat !== undefined &&
    (typeof farePerSeat !== "number" || farePerSeat < 0)
  )
    return res.status(400).send("farePerSeat must be a positive number.");

  if (
    seatsAvailable !== undefined &&
    (typeof seatsAvailable !== "number" || seatsAvailable < 0)
  )
    return res.status(400).send("seatsAvailable must be a positive number.");

  if (driverName !== undefined && typeof driverName !== "string")
    return res.status(400).send("driverName must be a string.");

  if (route !== undefined && typeof route !== "string")
    return res.status(400).send("route must be a string.");

  next();
}
