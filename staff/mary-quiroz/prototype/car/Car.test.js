var Car = require('./car')

console.log('TEST CAR')

console.log('CASE constructor')

var car = new Car('ferrari', 'Testarossa', 1990, 'red', 3, 'gasoline', 'manual', 6)

console.assert(car.brand ==='ferrari', 'brand is Ferrari')
console.assert(car.model === 'Testarossa', 'model is Testarossa')
console.assert(car.status === 'off', 'is off')
console.assert(car.deposit === 0, 'deposit is 0')
console.assert(car.year ===1990, 'year is 1990')
console.assert(car.color ==='red', 'red is color')
console.assert(car.fuelType === 'gasoline', 'fuel type is gasoline')
console.assert(car.transmission === 'manual', 'transmission is manual')
console.assert(car.gears === 6, 'gears is 6')
console.assert(car.gear === 0, 'gear is 0')
console.assert(car.speed === 0, 'speed is 0')
console.assert(car.acceleration === 0, 'acceleration is empty')
console.assert(car.direction === 'none', 'direction is empty')
console.assert(car.steering === 0, 'steering is at 0')

console.log('CASE method fuel')

var car = new Car('ford', 'Fiesta')

car.fuel(80)

console.assert(car.deposit === 80, 'deposit is at 80%')

try {
    car.fuel(541)
} catch (error) {
    console.assert(error.name, 'RangeError',  'the load must be from 1 to 100')
    console.assert(error.message, '541 is out of range from 1 to 100')
}

try {
    car.fuel('full')
} catch (error) {
    console.assert(error.name, 'RangeError',  'the load must be from 1 to 100')
    console.assert(error.message, 'full is not a number')
}


console.log('CASE method start')

var car = new Car('Citroen','CV')

car.start()

console.assert(car.status === 'on', 'status is on')


console.log('CASE method stop')

var car = new Car('Citroen', 'CV')

car.status = 'on'

car.stop()

console.assert(car.status === 'off', 'status is off')

console.log('CASE method changeGear')

var car = new Car('citroen', 'CV', 1960, 'red', 5, 'gasoline', 'manual', 4)

car.changeGear(1)

console.assert(car.gear === 1, 'gear is 1')

car.changeGear(2)

console.assert(car.gear === 2, 'gear is 2')

try {
    car.changeGear(6)
} catch (error) {
    console.assert(error.name, 'RangeError')
    console.assert(error.message, 'gear greater than 6')
}

try {
    car.changeGear('limit')
} catch (error) {
    console.assert(error.name, 'RangeError')
    console.assert(error.message, 'gear must be a number')
}

try {
    car.changeGear(4,5)
} catch (error) {
    console.assert(error.name, 'RangeError')
    console.assert(error.message, 'gear must be a integer number')
}
car.changeGear(-1)

console.assert(car.gear === -1, 'gear is -1')

console.log('CASE steerWheel()')

car.steerWheel (45)
console.assert(car.steerDirection === 45, 'steer direction')

try {
    car.sterWheel('fast')
}catch (error){
    console.assert(error.name === 'TypeError', 'name error on not a number')
    console.log(error.message ==='fast is not a number', 'message error on not a number')
}

try{
    car.steerWheel(400)
} catch (error){
    console.assert(error.name === 'RangeError', 'name error on out of range')
    console.assert(error.message === 'you can only steer from -90 to 90', 'message error on out of range')
}


console.log('CASE speedUp()')

car.start()
car.speedUp(50)
console.assert(car.speed === 50, 'speed')

try {
    car.speedUp('hi')
} catch (error) {
    console.assert(error.name === 'TypeError', 'error name on not a number')
    console.assert(error.message === 'hi is not a number', 'error message on not a number')
}

try {
    car.speedUp(200)
} catch (error) {
    console.assert(error.name === 'RangeError', 'error name on out of range')
    console.assert(error.message === 'The speed can only be from 1 to 120')
}

car.stop()
try {
    car.speedUp(30)
} catch (error) {
    console.assert(error.name === 'Error', 'error name on car turned off')
    console.assert(error.message === 'Your car is turned off', 'error message on car turned off')
}