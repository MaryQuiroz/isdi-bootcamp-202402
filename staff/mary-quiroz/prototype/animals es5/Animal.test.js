var assert = require('../assert')

var Animal = require('./Animal')

console.log('TEST Animal')

console.log('CASE constructor')

var chimuelo = new Animal ('Chimuelo', new Date(2022,5, 1), 'ES', 5)

assert.instanceOf(chimuelo, Animal)
assert.equalsValue(chimuelo.constructor, Animal)
assert.equalsValue(chimuelo.name, 'Chimuelo')
assert.instanceOf(chimuelo.birthdate, Date)
assert.equalsValue(chimuelo.birthdate.getFullYear(), 2022)
assert.equalsValue(chimuelo.birthdate.getMonth(), 5)
assert.equalsValue(chimuelo.birthdate.getDate(), 1)
assert.equalsValue(chimuelo.country, 'ES')
assert.equalsValue(chimuelo.weight, 5)
assert.equalsValue(chimuelo.sleeping,false)
assert.equalsValue(chimuelo.eating, '')
assert.equalsValue(chimuelo.legsSpeed, 0)

console.log('CASE sleep')

var chimuelo = new Animal('Chimuelo', new Date(2022,5,1), 'ES', 5)

chimuelo.sleep()

assert.equalsValue(chimuelo.sleeping, true)

console.log('CASE awake')

var chimuelo = new Animal('Chimuelo', new Date(2022,5,1), 'ES', 5)

chimuelo.sleep = true

chimuelo.awake()

assert.equalsValue(chimuelo.sleeping, false)

console.log('CASE eat')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.eat('croquettes')

assert.equalsValue(chimuelo.eating, 'croquettes')

console.log('CASE eat on sleeping (unhappy)')

var chimuelo = new Animal('Chimuelo', new Date(2022,5,1), 'ES', 5)

chimuelo.sleeping = true

var errorthrown

try {
    chimuelo.eat('croquettes')
} catch (error) {
    errorthrown = error
}

assert.error(errorthrown, 'Error', 'try to eat on sleeping')


console.log('CASE not walk')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.NOT_WALK)

assert.equalsValue(chimuelo.legsSpeed, Animal.NOT_WALK)


console.log('CASE walk')

var chimuelo = new Animal('Chimuelo', new Date(2022,5,1), 'ES', 5)

chimuelo.moveLegs()
assert.equalsValue(chimuelo.legsSpeed, Animal.WALK_NORMAL)

console.log('CASE walk fast')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.WALK_FAST)

assert.equalsValue(chimuelo.legsSpeed, Animal.WALK_FAST)

console.log('CASE walk slow')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.WALK_SLOW)

assert.equalsValue(chimuelo.legsSpeed, Animal.WALK_SLOW)

console.log('CASE walk normal')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.WALK_NORMAL)

assert.equalsValue(chimuelo.legsSpeed, Animal.WALK_NORMAL)

console.log('CASE walk very slow')

var chimuelo = new Animal ('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.WALK_VERY_SLOW)

assert.equalsValue(chimuelo.legsSpeed, Animal.WALK_VERY_SLOW)

console.log('CASE run')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.moveLegs(Animal.RUN)

assert.equalsValue(chimuelo.legsSpeed, Animal.RUN)

console.log('CASE toString')

var chimuelo = new Animal('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

assert.equalsValue(chimuelo.toString, 'Animal, (Chimuelo)')

