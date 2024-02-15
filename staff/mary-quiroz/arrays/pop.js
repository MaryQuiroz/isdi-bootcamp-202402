function pop(array){
if (array.length > 0)
var lastIndex = array.length - 1
var lastElement =array[lastIndex]
array.length--

return lastElement
}

var num = [1, 2, 3, 4]
var num = pop(num)

console.log(num.length)
// [1, 2 ,3]

console.log(pop)
// 4

