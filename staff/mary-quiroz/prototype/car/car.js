function Car(brand, model, year, color, doors, fuelType, transmission, gears) {
    this.brand = brand
    this.model = model
    this.year = year
    this.color = color
    this.fuelType = fuelType
    this.doors = doors
    this.transmission = transmission
    this.gears = gears
    this.status ='off'
    this.deposit = 0
    this.gear = 0
    this.speed = 0
    this.acceleration = 0
    this.direction = 'none'
    this.steerDirection = 0
    this.steering = 0 
}

Car.prototype.fuel = function (load) {

if(load > 100 || load < 1)  {
    throw new RangeError('the load must be from 1 to 100')
}

if(typeof load !== 'number') {
    throw new RangeError('the load must be from 1 to 100')
}

this.deposit = load
return this.deposit
}


Car.prototype.start = function () {
    this.status = 'on'

}

Car.prototype.stop = function () {
    this.status = 'off'

}


Car.prototype.changeGear = function(gear){

if(gear < -2 || gear > 5) {
    throw new RangeError('the gear must be -1 to 4')
}
if(typeof gear!=='number') {
    throw new RangeError ('the gear must be a number')
}
if( !Number.isInteger(gear)) {
    throw new RangeError ('The gear must be integer number')
}
 this.gear = gear

    if (gear < 0)
        this.direction = 'backward'
    else if (gear === 0)
        this.direction = 'none'
    else
        this.direction = 'forward'
}

Car.prototype.steerWheel = function(degrees){
    if(typeof degrees !== 'number'){
        throw new TypeError ( degrees + 'is not a number')
    }

    if(degrees < -90 || degrees> 90){
        throw new TypeError('You can only steer from -180º to 180º')       
    }
    this.steerDirection = degrees

}

Car.prototype.speedUp = function(speed){
    if(this.status === 'off'){
        throw new Error('your car is turn off')
    }

    if(this.load < 1){
        throw new Error('You do not have enougth fuel')
    }

    if(typeof speed !== 'number'){
        throw new Error('you have to give me a number')
    }

    if(speed < 1 || speed > 120){
        throw new RangeError('yo have to choose fom 1 to 120')
    }
    this.speed = speed
}




module.exports = Car

