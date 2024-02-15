delete String.prototype.lastIndexOf

function lastIndexOf(string, searchString) {

for (var i = string.length - 1; i >= 0; i--) {
    var coincide = true;
    for (var j = 0; j < searchString.length; j++) {
        if (string[i - j] !== searchString[searchString.length - 1 - j]) {
            coincide = false;
            break;
        }
    }
    if (coincide) {
        return i - searchString.length + 1;
    }
}
}
// CASE 1

var s = 'hola mundo'

var index = lastIndexOf(s, 'o')

console.log(index)
// 9

// CASE 2

var s = 'hola mundo'

var index = lastIndexOf(s, 'ol')

console.log(index)
// 1