/*Khaled is a broke university student (duh, most of us are), who turns out to also be a pizza delivery guy
  he takes on the ever so tedious role of sending the orders to the chef and doesn't even do it right
  then for some reason does some math in the middle of everything, all while the pizza i ordered is running cold
  he's also calculating the action he should do if i had different levels of hunger, which honestly already increases
  my hunger level. Surprisingly, Khaled manages to deliver my pizza (Thank God),
  and i even decided to tip him (probably shouldn't have, but oh well), and at the end of the day, this is about pizza.
  TL;DR : Khaled should NOT be delivering pizza.
*/

// Task One ---------------------------------------------

let studentName = "Ahmed"
const pizzaFlavor = "pepperoni"

// Task Two ---------------------------------------------

let hungerLevel = 10
let isPizzaHot = true
let deliveryAddress = "Cairo"

console.log(typeof hungerLevel)
console.log(typeof isPizzaHot)
console.log(typeof deliveryAddress)

// Task Three ---------------------------------------------

let pizzaCost = Number("85")
const tip = 15
console.log(pizzaCost + tip + true)

// Task Four ---------------------------------------------

let totalBill = pizzaCost + tip
let minutesWaiting = 45 + 15
if(minutesWaiting % 2 === 0)
    console.log("Even")
else
    console.log("Odd")

// Task Five ---------------------------------------------

console.log(2 + 3 * 4 - 1) // probably 13

console.log((2+3)*(4-1)) // probably 15

// Task Six ---------------------------------------------

if(isPizzaHot && hungerLevel > 7)
    console.log("OPEN THE DOOR AND SPRINT")
else if (hungerLevel <= 5 && hungerLevel >= 7)
    console.log("Walk, you have dignity")
else
    console.log("Order sushi next time")

// Task Seven ---------------------------------------------

let isHungerMoreThanFive = hungerLevel > 5 // This is a boolean expression that returns true/false

if(hungerLevel > 5) // A statement is an action that gets executed when a condition is met
    console.log("Wow so this is what an expression is?")

// Task Eight ---------------------------------------------

console.log(pizzaFlavor.toUpperCase()) // prints the string returned by the .toUpperCase() function
console.log(pizzaFlavor.length) 
console.log(pizzaFlavor.includes("pepper")) 

// Task Nine ---------------------------------------------

console.log(`The order of ${pizzaFlavor} pizza in the name of ${studentName} is coming right up!
            he has waited ${minutesWaiting} minutes and his total is: ${totalBill} EGP`)

// Task Ten ---------------------------------------------

const toppings = ['pepperoni','pineapple','chicken']

const order = {
    customer: studentName,
    flavor: pizzaFlavor,
    isDelivered: false
}
// Task Eleven ---------------------------------------------
// here's my single line comment!
function calculateTotal(price,tip) {
    return price + tip
}
calctotal = (pizzaCost,tip) => {return pizzaCost+tip}

console.log(calculateTotal(pizzaCost,tip))

console.log(calctotal(pizzaCost,tip))

// Task Twelve ---------------------------------------------

const stops = ["Ahmed", "Sara", "Mona", "Tarek"]

for (stop of stops) {
    console.log(`Delivering to ${stop}...`)
    if(stop === "Ahmed")
        break
}

// Task Thirteen ---------------------------------------------

// oh it turned out not to be related to coding, alright..
