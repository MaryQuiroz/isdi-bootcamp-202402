function pop(array){
    delete Array.prototype.pop

    function pop(array) {
        if (array.length > 0) {
            var lastIndex = array.length - 1
            var lastElement = array[lastIndex]
    
            array.length--
    
            return lastElement
        }
    }
    
    console.log('CASE 1')
    
    var nums = [100, 200, 300, 400, 500]
    
    var num = pop(nums)
    
    console.log(num)
    // 500
    console.log(nums.length)
    // 4
    console.log(nums)
    // [100, 200, 300, 400]
    
    
    console.log('CASE 2')
    
    var animals = ['pigs', 'goats', 'sheep', 'cows']
    
    var animal = pop(animals)
    
    console.log(animal)
    // 'cows'
    console.log(animals.length)
    // 3
    console.log(animals)
    // ['pigs', 'goats', 'sheep']
    
    console.log('CASE 3')
    
    var sports = ['soccer', 'baseball']
    
    var sport = pop(sports)
    
    console.log(sport)
    // 'baseball'
    console.log(sports.length)
    // 1
    console.log(sports)
    // ['soccer']
    
    console.log('CASE 4')
    
    var sports = []
    
    var sport = pop(sports)
    
    console.log(sport)
    // undefined
    console.log(sports.length)
    // 0
    console.log(sports)
    // []
}
