delete Array.prototype.concat

function concat(array, array2) {
    var newArray = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        newArray[i] = element
    }

    for (var i = 0; i < array2.length; i++) {
        var element = array2[i]

        newArray[newArray.length] = element
    }

    return newArray
}

console.log('CASE 1')

var nums = [100, 200, 300, 400, 500]
var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = concat(nums, animals)

console.assert(result.length === 9)
// 9
console.assert(result[0] === 100, "100")
console.assert(result[1] === 200, "200")
console.assert(result[2] === 300, "300")
console.assert(result[3] === 400, "400")
console.assert(result[4] === 500, "500")
console.assert(result[5] === "pigs")
console.assert(result[6] === "goats")
console.assert(result[7] === "sheep")
console.assert(result[8] === "cows")

// [100, 200, 300, 400, 500, 'pigs', 'goats', 'sheep', 'cows']

console.log('CASE 2')

var nums = []
var animals = []

var result = concat(nums, animals)

console.assert(result.length === 0)
// 0
console.assert(typeof result === 'object')
// []

console.log('CASE 3')

var nums = [100, 200, 300, 400, 500]
var animals = ['pigs', 'goats', 'sheep', 'cows']
var fruits = ['apples', 'bananas', 'oranges', 'lemons']
var cars = ['lambo', 'ferra', 'merce', 'porsc']

var result = concat(nums, animals, fruits, cars)

console.log(result)
// ['pigs', 'goats', 'sheep', 'cows', 'apples', 'bananas', 'oranges', 'lemons', 'lambo', 'ferra', 'merce', 'porsc']