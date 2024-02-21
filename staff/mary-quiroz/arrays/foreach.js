delete Array.prototype.forEach

function forEach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        callback(element)
    }
}

console.log('CASE 1')

var nums = [10, 20, 30, 40, 50]

forEach(nums, function (num) {
    console.log(num)
})
// 10
// 20
// 30
// 40
// 50