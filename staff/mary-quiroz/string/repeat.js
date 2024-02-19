delete String.prototype.repeat

function repeat(string, count) {
   var strFinal = ""
   if(count>0) {
    for(var i = 0; i < count; i++) {
        strFinal+=string
    } 
    return strFinal
   }
}


// CASE 1

var s = 'happy! '

var result = repeat(s, 3)

console.log(result)
// 'happy! happy! happy!'