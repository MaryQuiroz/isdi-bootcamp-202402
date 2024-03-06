var assert = require('../assert')

var Animal = require('./Animal')
var Pet = require('./pet')
var Person = require('./Person')

console.log('TEST Pet')

console.log('CASE constructor')

var marc = new Person('Marc', new Date(2000, 1, 3), 22, 185, 80, 'Norway')
var chimuelo = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)


assert.instanceOf(chimuelo, Pet)
assert.equalsValue(chimuelo.constructor, Pet)
assert.equalsValue(chimuelo.name, Pet)
assert.equalsValue(chimuelo.birthdate.getFullYear(), 2022)
assert.equalsValue(chimuelo.birthdate.getMonth(), 5)
assert.equalsValue(chimuelo.birthdate.getDate(), 1)
assert.equalsValue(chimuelo.breed, 'creole')
assert.equalsValue(chimuelo.color, 'black')
assert.equalsValue(chimuelo.sleeping, false)
assert.equalsValue(chimuelo.eat,'')
assert.equalsValue(chimuelo.jump, 2)
assert.equalsValue(chimuelo.play, 0)

assert.instanceOf(chimuelo, Pet)
assert.instanceOf(sultan, Animal)


console.log('CASE toString')

var marc = new Person('Marc', new Date(2000, 1, 3), 22, 185, 80, 'Norway')
var chimuelo = new Pet('Marc', 'Chimuelo', new Date(2022, 5, 1), 'ES', 5)

assert.equalsValue(chimuelo.toString(), 'Pet (chimuelo, 2022-06-01, ES)')


console.log('CASE constructor fails on non-Person owner')

var errorThrown

try {
    new Pet(undefined, 'Chimuelo', new Date(2022, 5, 1), 'ES', 5)
} catch (error) {
    errorThrown = error
}

assert.error(errorThrown, 'TypeError', 'owner is not a Person')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

pet.sleep()

assert.equalsValue(pet.sleepping, true)

console.log('CASE awake')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

pet.sleepping = true

pet.awake()

assert.equalsValue(pet.sleepping, false)

console.log('CASE eat')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

pet.eating('croquettes')

assert.equalsValue(pet.eat, 'croquettes')


console.log('CASE jumping')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

pet.jumping(2)

assert.equalsValue(pet.jump, 2)


console.log('CASE status')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'ES', 5)

pet.playing(Pet.DONT_PLAY)

assert.equalsValue(pet.play, Pet.DONT_PLAY)



