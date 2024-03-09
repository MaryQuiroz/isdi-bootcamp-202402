var assert = require('../assert')

var Person = require('./Person')


console.log('TEST PERSON')

console.log('CASE constructor')

var marc = new Person('Marc', new Date(2000, 1, 3), 185, 80, 'Norway')



assert.instanceOf(marc, Person)
assert.equalsValue(marc.constructor, Person)
assert.equalsValue(marc.name, 'Marc')
assert.instanceOf(marc.birthdate, Date)
assert.equalsValue(marc.birthdate.getFullYear(), 2000)
assert.equalsValue(marc.birthdate.getMonth(), 1)
assert.equalsValue(marc.birthdate.getDate(), 3)
assert.equalsValue(marc.height, 185)
assert.equalsValue(marc.weidth, 80)
assert.equalsValue(marc.country, 'Norway' )
assert.equalsValue(marc.sleeping, false)
assert.equalsValue(marc.eating, '')
assert.equalsValue(marc.legsSpeed, Person.NOT_WALK)
assert.equalsValue(marc.talking, false)

console.log('CASE walk & talk')

var marc = new Person('Marc', new Date(2000, 1, 3), 185, 80, 'Norway')


marc.moveLegs()
marc.talk()

assert.equalsValue(marc.talking, true)
assert.equalsValue(marc.legsSpeed, Person.WALK_NORMAL)



