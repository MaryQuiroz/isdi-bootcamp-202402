import Component from "../core/Component.mjs";
import Form from "../core/Form.mjs";
import Input from "../core/Input.mjs";
import Label from "../core/Label.mjs";

class Resgister extends Component {
    constructor() {
        super('main')

        const title = new Component('hi')
        title.setText('Register')

        const form = new Form

        const nameLabel = new Label
        nameLabel.setFor('name')
        nameLabel.setText('Name')

        const nameInput = new Input
        nameInput.setId('name')

        const birthdateLabel = new Label
        birthdateLabel.setFor('birthdate')
        birthdate.setFor.serText('Birthdate')

        const birthdateInput = new DateInput
        birthdateInput.setId('birthdate')

        const emailLabel = new Label
        emailLabel.setFor('email')
        emailLabel.setText('E-mail')

        const emailInput = new EmailInput
        emailInput.setId('email')

        const usernameLabel = new Label
        usernameLabel.setFor('username')
        usernameLabel.setText('Username')

        const usernameInput = new Input
        usernameInput.setId('username')

        const passwordLabel = new Label
        passwordLabel.setFor('password')
        passwordLabel.setText('Password')

        const passwordInput = new PasswordInput
        passwordInput.setId('password')

        const submitButton = new RoundButton
        submitButton.setText('Register')
        submitButton.setType('submit')

        form.onSubmit(event => {
            event.preventDefault()

            const name = nameInput.getValue()
            const birthdate = birthdateInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.registerUser(name, birthdate, email, username, password)

                form.reset()

                location.href = '../login'
            } catch (error) {
                utils.showFeedback(error)
            }

        })

        form.add(nameLabel, nameInput, birthdateLabel, birthdateInput, emailLabel, emailInput, usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const link = new Link
        link.setText('Login')
        link.setHref('../login')

        this.add(title, form, link)
    }
}

export default Register



  