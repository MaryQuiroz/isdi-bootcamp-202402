delete String.prototype.slice

function slice(string, indexStart, indexEnd) {
   if(indexStart<0) {
    indexStart = string.length + indexStart
   }
   if (indexEnd<0) {
    indexEnd = string.length + indexEnd
   }
   if (!indexEnd) {
    indexEnd = string.length
   }
   if(indexEnd > string.length){
    indexEnd = string.length
   }
   var result = ""
   
   for(var i = indexStart; i<indexEnd; i++) {
    result = string[i]
   }
}
return result

// CASE 1

var s = 'hola mundo'

var piece = slice(s, 5, 8)

console.log(piece)
// 'mun'

// CASE 2

var s = 'hola mundo'

var piece = slice(s, -3)

console.log(piece)
// 'ndo'


var saludo = "hola mundo";
var result = endsWith(saludo, "mundo");
console.log(result);