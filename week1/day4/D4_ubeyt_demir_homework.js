
/*
ASSIGNMENT RULES
- All the answers must be in JavaScript
- The solution must be pushed to the repository and be available for the tutors by the end of the day
- You can ask for tutor's help
- You can google / use StackOverflow BUT we suggest you to use just the material provided
*/

/* EXERCISE 1
Write a function "area" which receives 2 parameters (l1,l2) and calculate the area of the rectangle.
*/

const area = (l1,l2) => {
    if(typeof l1 === "number" && typeof l2 === "number"){
        return l1 * l2;
    }
    else{
        throw new Error("l1 and l2 must be numbers");
    }
}

/* EXERCISE 2
Write a function "crazySum" which receives two given integers. If the two values are same, then returns triple their sum.
*/

const crazySum = (n1,n2) => {
    try{
        if(Number.isInteger(n1) && Number.isInteger(n2)){
            if(n1 === n2){
                return 3*(n1+n2);
            }
            else{
                throw new Error("n1 or n2 must be  equal")
            }
        }
        else{
            throw new Error("n1 or n2 must be integer")
        }
    }
    catch(e){
        throw new Error(e)
    }
}

 
/* EXERCISE 3
Write a function "crazyDiff" that computes the 
absolute difference between a given number and 19. 
Returns triple their absolute difference if 
the specified
number is greater than 19.
*/

const crazyDiff = (givenNumber) => {
   if(typeof givenNumber=="number"){
    return Math.abs(19-givenNumber);
   }
   else{
       throw new Error("Given number must be number")
   }
}



/* EXERCISE 4
Write a function "boundary" which accept an integer N and returns true if N is within 20 and 100 (included) or equal to 400.
*/

const boundary = (n) => {
    if(Number.isInteger(n)){
        return (n >= 20 && n <=100) || (n===400)
    }
    else{
        throw new Error("n must be integer")
    }
 
}

/* EXERCISE 5
Write a function "strivify" which accepts a string S. Add to S "Strive" in front of a given string, if the given string begins with "Strive" then return the original string.
*/

const strivify = (s) => {
    if(typeof s === "string"){
        return s.startsWith("Strive") ? s : `Strive ${s}`
    }
    else{
        throw new Error("s must be a string")
    }
}

/* EXERCISE 6
Write a function "check3and7" which accepts a positive number and check if it is a multiple of 3 or a multiple of 7.
HINT: Module Operator
*/

const check3and7 = (number) => {
    if(typeof number==="number"&&number>0){
        return number%3==0 && number%7==0;
    }
    else{
        throw new Error("Number parameter must be a positive number");
    }
}


/* WRITE YOUR CODE HERE */

/* EXERCISE 7
Write a function "reverseString" to reverse programmatically a given string (es.: Strive => evirtS).
*/

const reverseString = (s) => {
   try {
    if(typeof s==="string"){
        return s.split("").reverse().join("");
    }
    else{
     throw new Error("s must be a string")
     }
   } catch (e) {
    throw new Error(e)
   }
}



/* WRITE YOUR CODE HERE */

/* EXERCISE 8
Write a function "upperFirst" to capitalize the first letter of each word of a given string passed as parameter
*/
const upperFirst = (s) => {
    try{
        if(typeof s==="string"){
            let words = s.trim().split(" ");
            let sentence = words.map(word=>word.replace(word[0],word[0].toUpperCase())).join(" ")
            console.log(sentence)
        }
        else{
            throw new Error("s must be a string")
        }
    }
    catch(e){
        throw new Error(e)
    }
 }


/* WRITE YOUR CODE HERE */

/* EXERCISE 9
Write a function "cutString" to create a new string without the first and last character of a given string.
*/

const cutString = (s) => {
    try{
        if(typeof s === "string"){
            return s.replace(/ /g, '').replace(s[0],'').replace(s[s.length-1],'');
        }
        else{
            throw new Error("s must be a string")
        }
    }
    catch(e){
        throw new Error(e)
    }

}


/* WRITE YOUR CODE HERE */

/* EXERCISE 10
Write a function "giveMeRandom" which accepts a number n and returns an array containing n random numbers between 0 and 10
*/

const giveMeRandom = (number) => {
    let array=[];
    if(typeof number==="number"&& number <=10){ // otherwise it will not generate unique numbers
        for(let i=0; i<number;){
            let random = Math.ceil(Math.random()*10);
            if(!array.includes(random)){
                array.push(random)
                i++
            }
          
        }
    }
    return array;
}



/* WHEN YOU ARE FINISHED
Commit and push the code to your personal GitHub repository and share the link to your commit with your tutor.
*/
