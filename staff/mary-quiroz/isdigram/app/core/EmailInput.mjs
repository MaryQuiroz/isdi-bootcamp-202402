import Input from '._Input.mjs'

class EmailInput extends Input {
    constructor() {
        super()

        this.setType('email')
    }
}

export default EmailInput