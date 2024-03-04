function Pet(name, birthdate, breed, color) {
    this.name = name
    this.birthdate = birthdate
    this.country = country
    this.breed = breed
    this.color = color
    this.sleeping = false
    this.eat = ''
    this.jump = 2
    this.play = 0
}

Pet.prototype.sleep = function(){
    this.sleepping = true
}

Pet.prototype.awake =function(){
    this.sleepping = false
}

Pet.prototype.eating = function (food) {
    if(food !== 'croquettes') throw new Error('try to eat croquettes')
    this.eat = food
}

Pet.prototype.jumping = function (meters){
    if(typeof meters !== 'number')
        throw new Error ('You have to write a Number')
    this.jump = meters
}
Pet.DONT_PLAY = 0
Pet.PLAY_VERY_SLOWLY = 1
Pet.PLAY_SLOWLY = 2
Pet.PLAY_NORMAL = 3
Pet.PLAY_NORMAL_FAST = 4
Pet.PLAY_FAST = 5

Pet.prototype.playing = function (status){
    if(typeof status !== 'number')
        throw new Error ('You have to write a Number')
    this.play = status === undefined ? 3 : status

}


module.exports = Pet