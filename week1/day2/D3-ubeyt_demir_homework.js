/*
ASSIGNMENT RULES
- All the answers must be in JavaScript
- The solution must be pushed to the repository and be available for the tutors by the end of the day
- You can ask for tutor's help
- You can google / use StackOverflow BUT we suggest you to use just the material provided
- You can test your code in a separate file or commenting the single parts in this file or directly in the Developer Console or in the Node Console.
*/

/* EXERCISE 1
Create and array with the first 5 positive numbers
*/

let first5PositiveNumbers = [1, 2, 3, 4, 5];

/* EXERCISE 2
Create an object containing your name, surname, email address and age.
*/

let student = {
  name: "Ubeyt",
  lastName: "Demir",
  email: "ubeytdemir4se@gmail.com",
  age: new Date().getFullYear() - 1993,
};

/* EXERCISE 3
Add to the previously created object a boolean value to rappresent wheter you have or not a driving license
*/

student.hasDriverLicense = true;

/* EXERCISE 4
Remove from the previously created object the age
*/

delete student.age;

/* EXERCISE 5
Create a second object with name, surname, email address and verify that this object has a different email address
*/

let student2 = {};
Object.assign(student2, student);
student2.email = "different@email.com";

/* EXERCISE 6
You are working for a eCommerce. In the variable totalShoppingCart you have the total amount spent by the current user.
In your eCommerce you have a promotion: if the customer shopping cart is more than 50€, they can have free shipping (otherwise it costs 10€).
Write an algorithm that calculate totalCost based on this assumption.
*/

let shippingFee = 10;
let shoppingCart = {
  totalAmount: 49,
  hasFreeShipping: false,
  hasSpecialDiscount:false,
  discountPercentage: 0,
};
const beforeCalculate={};
Object.assign(beforeCalculate, shoppingCart);
if (shoppingCart.totalAmount > 50) {
  shoppingCart.hasFreeShipping = true;
  // shipping fee is not added 
}
else{
  shoppingCart.totalAmount+=shippingFee;
}

/* EXERCISE 7
You are working for the same eCommerce. Today is the black friday and everything has a 20% discount at the end of the purchase.
Modify the previous answer inserting this information and, applying the same rules for the shipping cost, calculate the totalShopping.
*/


const isBlackFriday = true;
if (isBlackFriday) {
  shoppingCart.hasSpecialDiscount = isBlackFriday;
  shoppingCart.discountPercentage = 0.2;
  shoppingCart.totalAmount=shoppingCart.totalAmount-shoppingCart.totalAmount*shoppingCart.discountPercentage
}

console.log("================================BEFORE CALCULATE================================")
console.log(beforeCalculate);
console.log("================================AFTER CALCULATE================================")
console.log(shoppingCart);
console.log("================================PRETTIFIED================================")
console.log(
  `
  Amount : ${beforeCalculate.totalAmount}€\n 
  Shipping: ${shoppingCart.hasFreeShipping ? "Free" : shippingFee + "€"} \n
  ${shoppingCart.discountPercentage!==0 ?`Discount : %${shoppingCart.discountPercentage * 100}\n`:""}
  Total: ${shoppingCart.totalAmount + "€"} \n

  `
  );
//console.log(shoppingCart)
/* EXERCISE 8
Create an object rapresenting a car with properties like brand, model, licensePlate.
After you create the first car, clone it and change the licensePlate without affecting the original car.
Do it for five cars.
*/

let defaultCars = [
  {
    brand: "audi",
    model: "v7",
    licensePlate: undefined,
  },
  {
    brand: "volkswagen",
    model: "passat",
    licensePlate: undefined,
  },
  {
    brand: "mercedes",
    model: "e90",
    licensePlate: undefined,
  },
  {
    brand: "bmw",
    model: "v7",
    licensePlate: undefined,
  },
  {
    brand: "tesla",
    model: "s",
    licensePlate: undefined,
  },
];
let carsWithPlateNumbers = [];
for (let i = 0; i < defaultCars.length; i++) {
  let carWithPlate = {};
  Object.assign(carWithPlate, defaultCars[i]);
  carWithPlate.licensePlate = `NEWCAR-${i+1}`;
  carsWithPlateNumbers.push(carWithPlate);
}


/* EXERCISE 9
Create a new array called carsForRent containing all the cars from the previous exercise
*/

let carsForRent = carsWithPlateNumbers;

/* EXERCISE 10
Remove the first and the last car from the carsForRent array.
*/

carsWithPlateNumbers.shift();
carsWithPlateNumbers.pop();

/* EXERCISE 11
Print in the console, the types of a single car, of the car licensePlate and of the brand

//  I didnt understant what do you want to say by saying type , I assume that you want to say data type so,

*/

let firstCar = carsWithPlateNumbers[0];
Object.entries(firstCar).map(entry =>{
  let key = entry[0];
  let type = typeof entry[1];
  //console.log({key,type})
})


/* EXERCISE 12
Create a new array called carsForSale and insert 3 cars in it.
Store in the variable totalCars the number of cars in both carsForSale and carsForRent arrays
*/

let carsForSale = defaultCars.slice(0, 3);
let totalCars = carsForSale.length + carsForRent.length;


/* EXERCISE 13
Print in the console the data from each car in the carsForSale array
*/

carsForSale.map(car=>console.log(car));

/* WHEN YOU ARE FINISHED
Send the code via Slack to the tutor! In the next days we'll also learn how to use GIT 
*/
