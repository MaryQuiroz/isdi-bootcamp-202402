var assert = require('./assert')

var Animal = require('./Animal')
var Pet = require('./pet')
var Cat = require('./cat')
var Person = require('./Person')

console.log('TEST Cat')

console.log('CASE constructor')

var marc = new Person('Marc', new Date(2000, 1, 3), 22, 185, 80, 'Norway')
var chimuelo = new Cat(Marc, 'Chimuelo', new Date(2022, 5, 1), 'ES', 5)

assert.equalsValue(chimuelo.constructor, Cat)
assert.instanceOf(chimuelo, Cat)
assert.instanceOf(chimuelo, Pet)
assert.instanceOf(chimuelo, Animal)

assert.equalsValue(chimuelo.name, 'Chimuelo')
assert.instanceOf(chimuelo.birthdate, Date)
assert.equalsValue(chimuelo.birthdate.getFullYear(), 2022)
assert.equalsValue(chimuelo.birthdate.getMonth(), 5)
assert.equalsValue(chimuelo.birthdate.getDate(), 1)
assert.equalsValue(chimuelo.country, 'ES')
assert.equalsValue(chimuelo.weight, 5)
assert.equalsValue(chimuelo.sleeping, false)
assert.equalsValue(chimuelo.eating, '')
assert.equalsValue(chimuelo.legsSpeed, 0)
assert.equalsValue(chimuelo.barking, false)

console.log('CASE bark')

var marc = new Person('Marc', new Date(2000, 1, 3), 185, 80, 'Norway')

var chimuelo = new Cat('Marc', 'Chimuelo', new Date(2022, 5, 1), 'ES', 5)

chimuelo.bark()

assert.equalsValue(chimuelo.barking, true)

console.log('CASE tsssh')

var marc = new Person('Marc', new Date(2000, 1, 3), 185, 80, 'Norway')

var chimuelo = new Animal ('Chimuelo', new Date(2022,5, 1), 'ES', 5)

chimuelo.barking = true

chimuelo.tsssh()

assert.equalsValue(chimuelo.barking, false)