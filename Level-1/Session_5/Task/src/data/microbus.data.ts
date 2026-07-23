export interface Microbus {
  id: number;
  driverName: string;
  route: string;
  farePerSeat: number;
  seatsAvailable: number;
  ratings: Record<string,number>[];
}

export const fleet: Microbus[] = [
  {
    id: 1,
    driverName: "Ahmed",
    route: "Mohandessin-Ramses",
    farePerSeat: 25,
    seatsAvailable: 14,
    ratings: [{ Mohamed: 3 }, { Khaled: 2 }],
  },
  {
    id: 2,
    driverName: "Mohamed",
    route: "Haram-Dokki",
    farePerSeat: 20,
    seatsAvailable: 10,
    ratings: [{ Sarah: 3 }, { Ayman: 3 }],
  },
  {
    id: 3,
    driverName: "Ibrahim",
    route: "Abbassiya-Roxi",
    farePerSeat: 15,
    seatsAvailable: 9,
    ratings: [{ Islam: 5 }, { Mariam: 3 }],
  },
  {
    id: 4,
    driverName: "Saleh",
    route: "Mazalat-Tahreer",
    farePerSeat: 15,
    seatsAvailable: 5,
    ratings: [{ Ahmed: 4 }, { Waleed: 2 }],
  },
];
