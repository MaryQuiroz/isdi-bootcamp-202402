/** 
 * Extract manys elements that matches the condition from an iterable object.
 * 
 * @param object - The iterable object to mutate.
 * @param index - The index from which to extractMany a value.
 * 
 * @thows {TypeError} when objects is not an object, or when index is not a number.
 */
    //El extract es la funcion principal
function extractMany(object, callback) {
    
}
/*
    var extracted = {}
    var contador = 0

    for (let key in object) {
        // Si entra aqui, la funcion termina
        // verifica si es un objeto
        if (typeof object !== 'object') {
            throw new TypeError('Is not a object')
        }

        // { name: 'Pepito', age: 50 }
        var element = object[key] //elemt es un objeto de usuario   
        var result = callback(element)//es true o false

        if (result) {
            extracted[contador] = element
            //{0:{ name: 'Pepito', age: 50 },
            //1: { name: 'Campa', age: 30 },
            //}
            delete object[key]
            contador++
        }

    }
    return extracted


}

function fnUsers(user) {
    //console.log(user)
    return user.age > 25
}

extracted = extractMany(users, fnUsers)
*/

console.log('CASE 1: extracts many user forms users')
var users = {
    0:{name:'wendy', age:19},
    1:{name:'peter', age:20},
    2:{name: 'Pepito', age:50},
    3:{name: 'Campa', age:30},
    4:{name:'Jame', age: 40},
    length: 5
}

var extracted = extractMany(users,function(user){
    return user.age > 25
})

console.log(extracted)

/*
{
    0:{name: 'Pepito', age:50},
    1:{name: 'Campa', age:30},
    2:{name: 'James', age:40,}
    length:3
}
*/
console.log(users)
/*
{
0:{name:'Wendy', age:19},
1:{name:'peter', age:20},
length:2
}
*/
