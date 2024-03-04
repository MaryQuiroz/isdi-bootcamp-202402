function Car(brand, model, year, color, doors, fuelType, transmission, gears) {
    this.brand = brand
    this.model = model
    this.status ='off'
    this.deposit = 0
    this.year = 1990
    this.color = 'red'
    this.fuelType = 'gasoline'
    this.transmission = 'manual'
    this.gear = 6
    
}


Car.prototype.fuel = function (load) {

if(load > 100 || load < 1)  {
    throw new RangeError('the load must be from 1 to 100')
}

if(typeof load !== 'number') {
    throw new RangeError('the load must be from 1 to 100')
}

// return "deposi  t is at "+load +"%"
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
}

module.exports = Car


    // var citroen = new Car('citroen', 'c1')
    // citroen.start()
    // console.log("Vamos a encender el coche",citroen)
    // citroen.stop()
    // console.log("Vamos a apagar el coche",citroen)
    // citroen.changeGear(4)
    // console.log("Vamos a cambiar de marcha el coche",citroen)
    // citroen.fuel(13)
    // console.log("Vamos a cambiar el fuel el coche",citroen.fuel(13))