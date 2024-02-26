delete Array.prototype.at

function at(array, index) {

    if( index > -1){
        var result = array[index]
    } else {
        var result = array[array.length + index]
    } 
    return result
/*
    var targetIndex = index > -1 ? index : array.length + index

    var element = array[targetIndex]

    return element
    */
}

console.log('CASE 1')

var nums = [100, 200, 300, 400, 500]

var num = at(nums, 3)

console.assert(num === 400, '400')
// 400


console.log('CASE 2')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, 4)

console.assert(char === ' ')

// ' '

console.log('CASE 3')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -3)

console.assert(char === 'n')
// 'n'

console.log('CASE 4')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -30)

console.log(char)
// undefined