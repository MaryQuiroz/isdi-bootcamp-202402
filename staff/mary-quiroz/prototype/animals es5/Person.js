var Animal = require('./Animal')

function Person (name, birthday, height, weight, country) {
    Animal.call(this, name, birthday, country, weight)


    this.name = name
    this.height = height
   this.talking = false

    
}

Person.prototype = Object.create(Animal.prototype)
Person.prototype.constructor = Person

Person.NOT_WALK = 0
Person.WALK_VERY_SLOW = 1
Person.WALK_SLOW = 2
Person.WALK_NORMAL = 4
Person.WALK_FAST = 5
Person.RUN = 6

Person.prototype.talk = function() {
    this.talking = true

}

module.exports = Person