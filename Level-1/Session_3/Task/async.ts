// PART 1:
function cookRice() {
  console.log("Rice starting...");
  for (let i = 0; i < 1e9; i++) {
    // Does absolutely nothing!
  }
  console.log("Rice done!");
}

function cookRiceAsync() {
  console.log("Rice starting..");
  setTimeout(() => console.log("Rice done!"), 1000);
}

cookRice(); // Blocks the code so nothing else runs before its finished!
console.log("Am Farouk yells at the next customer");
cookRiceAsync(); // Does not block the code, allowing for other tasks to finish before it's done!
console.log("Am Farouk yells at the next customer");

// PART 2:

function orderRice(callback: (message: string) => void) {
  console.log("Calling the rice supplier...");
  setTimeout(() => {
    callback("Rice delivered!");
  }, 1000);
}

orderRice((message) => {
  console.log(message);
});
console.log("Am Farouk keeps serving customers while waiting");

// PART 3:

let koshariOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Order ready! 🍝");
  }, 2000);
});

koshariOrder
  .then((message) => console.log(message))
  .catch((err) => console.log(err));

let sauceOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("We're out of da2a!");
  }, 2000);
});

sauceOrder
  .then((msg) => console.log("In case it succeeds somehow (it won't)" + msg))
  .catch((err) => console.log(err));

// PART 4:

function getRice(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Rice ready");
    }, 1000);
  });
}

function getChickpeas(rice: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Chickpeas ready, rice was: " + rice);
    }, 1000);
  });
}

function getSauce(chickpeas: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Sauce added, previous: " + chickpeas);
    }, 1000);
  });
}

getRice()
  .then((rice) => {
    return getChickpeas(rice);
  })
  .then((chickpea) => {
    return getSauce(chickpea);
  })
  .then((finalOrder) => {
    console.log(finalOrder);
  })
  .catch((err) => {
    console.log(err);
  });

// PART 5:

async function makeKoshari() {
  try {
    let rice = await getRice();
    let chickpea = await getChickpeas(rice);
    let finalOrder = await getSauce(chickpea);
    console.log(finalOrder);
  } catch (err) {
    console.log(err);
  }
}

makeKoshari();
