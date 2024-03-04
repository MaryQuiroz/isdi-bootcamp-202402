function Person (name, age, height, weidth, nationality) {
    this.name = name
    this.age = age
    this.height = height
    this.weidth = weidth
    this.nationality = nationality
    this.status = 'off'
    this.hasHungry = true

    
}

Person.prototype.wakeup = function(){
    if(this.status === 'off') {
        this.status = 'on'
    }

}
//var marc = new Person ('Marc', 22, 185, 80, 'single', 'norwegian')22

Person.prototype.eat = function(food){
    // Comprueba si te pasan comida
    if(!food)
    {
        throw new Error('You 0have to give food')
    }
    // comprueba que la comida sea un String typeof 
    if(typeof food !== 'String'){
        throw new Error ('You have to write a string')
    }

    this.hasHungry = false

}

Person.prototype.walk = function(){

}

Person.prototype.work = function(){

}

Person.prototype.sleep = function(){

}
module.exports = Person