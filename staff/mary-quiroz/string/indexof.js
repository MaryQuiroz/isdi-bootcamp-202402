delete String.prototype.indexOf

function indexOf(string, searchString) {
    for (var i = 0; i < string.length; i++) {
        var coincidencia = true;
        for (var j = 0; j < searchString.length; j++) {
            if (string[i + j] !== searchString[j]) {
                coincidencia = false;
                break;
            }
        }
        if (coincidencia) {
            return i;
        }
    }
    return -1;
}

// CASE 1

var s = 'hola mundo'

var index = indexOf(s, 'ola')

console.log(index)
// 1

// CASE 2

var s = 'hola mundo'

var index = indexOf(s, 'olaf')

console.log(index)
// -1