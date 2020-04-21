/*
ASSIGNMENT RULES
- All the answers must be in JavaScript
- You can ask for tutor's help
- The solution must be available for the tutors by the end of the day
- You can google / use StackOverflow BUT we suggest you to use just the material provided
- You can test your code in a separate file or commenting the single parts in this file or directly in the Developer Console or in the Node Console.
*/
/* EXERCISE 1
Write the code to execute a SUM between the number 12 and 20
*/

console.log("Sum of 12+20  = " + (12+20));

/* EXERCISE 2
Create a variable named X containing the number 12
*/

let x = 12;

/* EXERCISE 3
Create a variable named name containing the string John Doe
*/


let name = "John Doe";


/* EXERCISE 4

Execute a DIFFERENCE between the number 12 and the variable X, which stores the value 12

*/


console.log("DIFFERENCE between the number 12 and the variable X : "+(12-x));


/* EXERCISE 5



Create two variables: name1 and name 2. name1 is equal to john, name2 is equal to John.
Verify that name1 is different from name2. 
Verify then, that name1 and name2 are equals if both lowercase (without changing the value of name2)
*/

let name1 = "john";
let name2 = "John";

console.log(name1!==name2 ? "name1 is different from name2":"name1 is same with name2");
console.log(name1.toLowerCase()===name2.toLowerCase() ? "contains same value":"not containing same value");


/* EXERCISE 6
Create the variable X (value less than 10). Write the code to print the literal value of the given number (ex.: 1 => one, 5 => five)
*/


// Identifier 'x' has already been declared


x = 6;
if(x===0){
    console.log("zero");
}
else if(x===1){
    console.log( "one");
}
else if(x===2){
    console.log( "two");
}
else if(x===3){
    console.log( "three");
}
else if(x===4){
    console.log( "four");
}
else if(x===5){
    console.log( "five");
}
else if(x===6){
    console.log( "six");
}
else if(x===7){
    console.log("seven");
}
else if(x===8){
    console.log("eight");
}
else if(x===9){
    console.log("nine");
}
else if(x===10){
    console.log("ten");
}
else{
    console.log("number must be in range of 0, 10");
}

/* EXERCISE 7
Insert a value in a variable based on the resut of a ternary if
*/

let birthYear = 1993;
let generation = "unknown";

if(birthYear<=2015&& birthYear>=1995){
    generation="Generation Z"
    console.log("Generation : "+generation);
}

else if(birthYear<=1994&& birthYear>=1980){
    generation="Millenial"
    console.log("Generation : "+generation);
}

else if(birthYear<=1965&& birthYear>=1979){
    generation="Generation X"
    console.log("Generation : "+generation);
}

else if(birthYear<=1944&& birthYear>=1964){
    generation="Baby Boomer"
    console.log("Generation : "+generation);
}
else{
    console.log("The year of birth is evaluated between the ages of 1944-2015.\n Source : https://www.kasasa.com/articles/generations/gen-x-gen-y-gen-z")
}

/* WHEN YOU ARE FINISHED
Send the code via Slack to the tutor! In the next days we'll also learn how to use GIT 
*/