var Pet = require('./pet')

function Cat(owner, name, birthdate, country, weight) {
    Pet.call(this, owner, name, birthdate, country, weight)

    this.barking = false
}

Cat.prototype = Object.create(Pet.prototype)
Cat.prototype.constructor = Cat

Cat.prototype.bark = function () {
    this.barking = true
}

Cat.prototype.tsssh = function () {
    this.barking = false
}

module.exports = Cat