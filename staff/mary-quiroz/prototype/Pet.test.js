var assert = require('./assert')
var Pet = require('./pet')

console.log('TEST PET')

console.log('CASE constructor')

var pet = new Pet('Chimuelo', new Date(2022, 5, 1), 'creole', 'black')

assert.equalsValue(pet.name, 'Chimuelo')
assert.equalsValue(pet.birthdate.getFullYear(), 2022)
assert.equalsValue(pet.birthdate.getMonth(), 5)
assert.equalsValue(pet.birthdate.getDate(), 1)
assert.equalsValue(pet.breed, 'creole')
assert.equalsValue(pet.color, 'black')
assert.equalsValue(pet.sleeping, false)
assert.equalsValue(pet.eat,'')
assert.equalsValue(pet.jump, 2)
assert.equalsValue(pet.play, 0)


console.log('CASE sleep')

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



