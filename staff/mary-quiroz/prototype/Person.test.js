var Person = require('./person')


console.log('TEST PERSON')

console.log('CASE constructor')

var person = new Person('Marc', 22, 185, 80, 'single', 'norwegian')

console.assert(person.name === 'Marc', 'His name is Marc')
console.assert(person.age === 22, 'He is 22 years old')
console.assert(person.height === 185, 'He is 185 cm')
console.assert(person.weidth === 80, 'He is 80 kg')
console.assert(person.civilStatus === 'single', 'He is single')
console.assert(person.nationality === 'norwegian', 'He is norwegian')
console.assert(person.status === 'off', 'He is off')
console.assert(person.hasHungry === 'true', 'He has hungry')

try {
    marc.eat(45)
} catch (error) {
    console.assert(error.name==='Error',  'The name is Error')

    console.assert(error.message==='You have to write a string', "the correct answer is: You have to write a string")
}

// try {
//     marc.eat()
// } catch (error) {
//     console.assert(error.message,'Error',  'You have to give food')
// }