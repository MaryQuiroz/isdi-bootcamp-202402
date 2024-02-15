delete String.prototype.split

function split(string, separator) {
        var result = [];
        var substring = '';
        
        for (var i = 0; i < string.length; i++) {
            if (string[i] === separator) {
                result[result.length] = substring;
                substring = '';
            } else {
                substring += string[i];
            }
        }
        result[result.length] = substring;
        
        return result;
    
}

// CASE 1

var s = 'hola mundo'

var words = split(s, ' ')

console.log(words)
// ['hola', 'mundo']