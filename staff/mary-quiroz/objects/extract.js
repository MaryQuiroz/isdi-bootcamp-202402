/**
 * Extracts an element that matches the condition from an iterable object
 * 
 * @param object - The iterable object to mutate.
 * @param index -The index from which to extract a value.
 * users[0]=users[0]
 * users[1]=users[1]
 * users[2]= callback
 * users[3]=users[2]
 * users[4]=users[3]
 * 
 * @throws {TyoeError} When object is not an object, or when index is not a number.
 */
function extract(object, callback) {
   

}

console.log('CASE 1: extract user pepito form users' )
 
var users = {
    0:{name: 'Wendy', age: 19},
    1:{name: 'Peter', age:20},
    2:{name: 'Pepito', age:50},
    3:{name: 'Campa', age: 30},
    4:{name: 'James', age:40},
    length:5
}



var user =  extract(users, function (user){
     if(user.name === 'Pepito'){
      return user
    }
})



console.log(user)
//{name:'Pepito, age:50}

console.log(users)
/*
{
    0:{name:'wendy', age: 19},
    1:{name:'Peter', age 20},
    2:{name: 'Campa',age:30},
    3:{name: 'James', age:40},
    length: 4
*/
