import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Component from '../../core/Component.mjs'
import Form from '../../core/Form.mjs'
import Label from '../../core/Label.mjs'
import Input from '../../core/Input.mjs'
import Button from '../../core/Button.mjs'


class Chat extends Component {
    constructor() {
        super('section')

        const userList = new Component('ul')

        try{
            const users = logic.retrieveMessagesWithUser()

            let chat = null

            users.forEach(user => {
                const userItem = new Component ('li')

                userItem.setText(user.username)

                userItem.addClass('user-list__item')

                if (user.status === 'online')
                userItem.addClass('user-list__item--online')
                else
                userItem.addClass('user-list__item--offline')

                userItem.onClick(() => {
                    if (chat) this.remove(chat)

                    chat = new Component

                    const usernameTitle = new Component ('h3')
                    usernameTitle.setText(user.username)

                    const messageList = new Component

                    messageList.addClass('message-list')

                    function renderMessages() {
                        messageList.removeAll()

                        try {
                            const messages = logic.retrieveMessagesWithUser(user.id)

                            messages.forEach(message => {
                                const messageItem = new Component('p')
                                messageItem.setText(message.text)

                                if(message.from === logic.getLoggedInUserId())
                                    messageItem.addClass('message-list__item--right')
                                else
                                    messageItem.addClass('message-list__item--left')

                                messageList.add(messageItem)

                            })

                        } catch (error) {
                            utils.showFeedback(error)
                        }

                    }

                    renderMessages.call(this)

                    chat.add(usernameTitle, messageList)

                    this.add(chat)

                    const sendMessageForm = new Form

                    sendMessageForm.onSubmint(event => {
                        event.preventDefault()

                        const text = textInput.getValue()

                        try{
                            logic.sendMessageToUser(user.id, text)

                            sendMessageForm.reset()

                            renderMessages.call(this)

                        }catch(error) {
                            utils.showFeedback(error)
                        }

                    })

                    const textLabel = new Label
                    textLabel.setText('text')
                    textLabel.setFor('text')

                    const textInput = new Input
                    textInput.setId('text')

                    const sendButton = new Button
                    sendButton.setType('submit')
                    sendButton.setText('Send')

                    sendMessageForm.add(textLabel, textInput, sendButton)

                    chat.add(sendMessageForm)

                })

                userList.add(userItem)
             })
                
            } catch (error) {
                utils.showFeedback(error)
            }

            this.add(userList)
        }

        
}

export default Chat