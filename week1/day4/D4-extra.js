/* EXERCISE 11
Write a function "checkArray" which receives an array of random numbers (created with giveMeRandom) and prints, for each item, whether it's bigger than 5.
The function returs the sum of the numbers bigger than 5.
*/

/* WRITE YOUR CODE HERE */

/* EXERCISE 12
In your eCommerce you have an array of object called shoppingCart. In this array you have a number of objects with a price, name, id and number to be shipped.
Create a function "shippingCartTotal" which calculates the total due to the shop.
*/

//helpers


const shoppingCartGenerator =  (n) =>  {
    return Array.from(Array(n).keys(),(id)=>{
        return {id,name:`product-${id+1}`,price:Math.ceil(Math.random()*id*5)+0.99,number:Math.ceil(Math.random()*id)+1}
    })
}

let shoppingCart = shoppingCartGenerator(Math.ceil(Math.random()*5));

//console.log(shoppingCart)

const shippingCartTotal =(shoppingCart)=> {
    let total = 0;
    shoppingCart.map(item=>{
        total+=item.number*item.price
     })
     return parseFloat(total.toFixed(2));
};


//console.log(shippingCartTotal(shoppingCart(10)));

/* EXERCISE 13
In your eCommerce you have an array of object called shoppingCart. In this array you have a number of objects with a price, name, id and number to be shipped.
Create a function "addToShoppingCart" which receives a new object and add it to shoppingCart and returns the number of items in the shoppingCart.
*/

const addToShoppingCart = (newItem) => {
   shoppingCart=[...shoppingCart,newItem]
   return shoppingCart.length;
}


/* EXERCISE 14
In your eCommerce you have an array of object called shoppingCart. In this array you have a number of objects with a price, name, id and number to be shipped.
Create a function "maxShoppingCart" which receives the shoppingCart array and returns the most expensive item in the array.
*/

const maxShoppingCart = (shoppingCart) => {
    let max =shoppingCart[0].price;
    shoppingCart.map((item, index) => {
        let nextItem = shoppingCart[index];
        if(nextItem&&nextItem.price > max){
            max=nextItem.price;
        }
    })
    return max;
}


/* EXERCISE 15
In your eCommerce you have an array of object called shoppingCart. In this array you have a number of objects with a price, name, id and number to be shipped.
Create a function "latestShoppingCart" which receives the shoppingCart array and returns the last item.
*/

const latestShoppingCart = (shoppingCart) => shoppingCart[shoppingCart.length-1];

/* EXERCISE 16
Create a function "loopUntil" which receives an integer X between 0 and 9.
The function loops and prints a random number between 0 and 9 until the random number is bigger than X three times in a row.
*/

const loopUntil = (x) => {
    if(Number.isInteger(x) && (x>= 0 && x<= 9)){
        let time = 0 ;
        while(time<3){
            let random = Math.ceil(Math.random()*9);
            if(random>x){
                console.log(`${time+1}. ${random} is bigger than ${x} `)
                time++;
            }
        }
    }
    else{
        throw new Error("x must be an integer and between 0 and 9")
    }
}

/* EXERCISE 17
Write a function "average" which receives an array and return the average value. The function automatically skips non-numeric entries in the array.
*/

const average = (array) => {
    let countNumbers=0;
    let sumOfNumbers=0;
   for (let i = 0; i <array.length;i++){
       if(typeof array[i]==="number"){
           sumOfNumbers=array[i];
           countNumbers++;
       }
   }
   return parseFloat((sumOfNumbers/countNumbers).toFixed(2));
}


/* EXERCISE 18
Write a function "longest" to find the longest string from an given array of strings.
*/

const longest = (stringArray) => {
    let max = stringArray[0];
    stringArray.map(data=>{
        if(typeof data === "string"){
            if(data.length>max){
                
            }
        }
    })
}

console.log(longest(["one","oneee","oneeeee"]))
/* EXERCISE 19
Write a function to create a very simple anti spam filter for your mailbox. The function takes a string emailContent, and returns a boolean.
Check if the email is valid using string methods. The email (in this example) is valid if the words SPAM and SCAM does not appear.
*/


/* ****** EXTRA EXERCISES ****** */

/* WRITE YOUR CODE HERE */

/* EXERCISE 20
Write a function that receives a date D as parameter and calculates the number of days passes since the D.
*/

/* WRITE YOUR CODE HERE */

/* EXERCISE 21
Write a function "matrixGenerator" that receives X and Y as parameter. The result should be a matrix of X times Y with, as value, the index of the position.
Ex.: X = 3, Y = 2
["00","01","02"
"10","11","12"]
*/

