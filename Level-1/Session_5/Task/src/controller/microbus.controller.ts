import { type Request, type Response } from "express";
import { fleet, type Microbus } from "../data/microbus.data.ts";

const getAllBusses = (req: Request, res: Response) => {
  res.status(200).send(fleet);
};

const getBusById = (req: Request, res: Response) => {
  const targetBusIndex = fleet.findIndex(
    (bus) => bus.id === Number(req.params.id),
  );

  if (targetBusIndex === -1 || Number.isNaN(targetBusIndex))
    return res.status(404).send("Am Ashraf doesn't run that one!");

  return res.status(200).send(fleet[targetBusIndex]);
};

const addNewBus = (req: Request, res: Response) => {
  const { driverName, route, farePerSeat, seatsAvailable } = req.body.bus;

  const newBus: Microbus = {
    id: fleet.length + 1,
    driverName,
    route,
    farePerSeat,
    seatsAvailable,
    ratings: [],
  };

  fleet.push(newBus);
  console.log(newBus);
  res.status(201).send("Bus Added!" + newBus);
};

const updateBusById = (req: Request, res: Response) => {
  let targetBusIndex = fleet.findIndex(
    (bus) => bus.id === Number(req.params.id),
  );

  if (targetBusIndex === -1) return res.status(404).send("Bus not found!");

  if (!req.body || !req.body.bus)
    return res.status(400).send("Invalid request body!");

  fleet[targetBusIndex] = { ...fleet[targetBusIndex], ...req.body.bus };

  return res.status(200).send(fleet[targetBusIndex]);
};

const removeBusById = (req: Request, res: Response) => {
  let targetBusIndex = fleet.findIndex(
    (bus) => bus.id === Number(req.params.id),
  );

  if (targetBusIndex === -1) return res.status(404).send("Bus not found!");
  else fleet.splice(targetBusIndex, 1);

  res.status(200).send("Bus removed!");
};

const getMaxFare = (req: Request, res: Response) => {
  if (!req.query.maxFare)
    return res.status(400).send("Incorrect filter setting!");
  else {
    const BussesBelowMaxFare: Microbus[] = fleet.filter(
      (bus) => bus.farePerSeat <= Number(req.query.maxFare),
    );

    if (BussesBelowMaxFare.length === 0)
      res.status(200).send("No busses with that price");
    else res.status(200).send(BussesBelowMaxFare);
  }
};

const getBusRatingByName = (req: Request, res: Response) => {
  const busId = Number(req.params.id);
  const rater = String(req.query.rater);

  if (!busId || !rater) return res.status(400).send("Bad request!");

  const wantedBus = fleet.find((bus) => bus.id === busId);

  if (!wantedBus) return res.status(404).send("Bus doesn't exist");

  const rating = wantedBus.ratings.find((item) => rater in item);

  if (!rating) return res.status(200).send(`${rater} never rated that bus!`);
  return res.status(200).send(`${rater} rated the bus ${rating[rater]}`);
};

export {
  getAllBusses,
  getBusById,
  getMaxFare,
  getBusRatingByName,
  addNewBus,
  updateBusById,
  removeBusById,
};
