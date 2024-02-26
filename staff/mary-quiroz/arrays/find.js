delete Array.prototype.find

function find(array, callback) {
    // TODO input validation

    // [5, 12, 8, 130, 44]

    // var elem = array[0]
    // var matches = callback(elem)
    // if (matches) return elem

    // var elem = array[1]
    // var matches = callback(elem)
    // if (matches) return elem

    // var elem = array[1]
    // var matches = callback(elem)
    // if (matches) return elem

    for (var i = 0; i < array.length; i++) {
        var elem = array[i]

        var matches = callback(elem)

        if (matches) {

            return elem
        }
    }
}

console.log('CASE 1: find first number greater thanb 20')

var nums = [5, 12, 8, 130, 44]

var found = find(nums, function (element) { return element > 20 })

console.assert(found === 130, '130')
// 130

console.assert(nums[0] === 5, '5')
console.assert(nums[1] === 12, '12')
console.assert(nums[2] === 8, '8')
console.assert(nums[3] === 130, '130')
console.assert(nums[4] === 44, '44')
console.assert(nums.length === 5, '5')
// [5, 12, 8, 130, 44]

console.log(nums)