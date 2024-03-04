function Arroz() {
    this.length = arguments.length

    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[i] = argument
    }
}

module.exports = Arroz