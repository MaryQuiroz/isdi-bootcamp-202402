delete String.prototype.at


function at (string, index) {
    var character
    if(index >=0) {
    character = string[index]
} else {
    var newIndex = string.length + index
    character = string[newIndex]
}
return character
}




// CASE 1

var s = 'hola mundo'

var char = at(s, 6)
// 'u'
console.log(char)
// CASE 2

var s = 'hola mundo'

var char = at(s, 20)
// undefined

// CASE 3

var s = 'hola mundo'

var char = at(s, -4)
// 'u'