import { Button, Label, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import createCat from '../logic/createCat'
import { AppContext } from '../context/AppContext'


export const AddCatForm = ({setShowModal}) => {
    const { addCat } = useContext(AppContext)
    


    const onSaveHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const color = form.color.value
        const breed = form.breed.value
        const birthdate = form.birthdate.value
        const avatar = form.avatar.value
        const description = form.description.value

        createCat(name, color, breed, birthdate, avatar, description)
            .then(cat => {
                addCat(cat)
                setShowModal(false)
            })
            .catch(error => console.log(error))

    }
    return (
        <form onSubmit={onSaveHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" type="text" placeholder="chimuelo" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="color" value="Color" />
                </div>
                <TextInput id="color" type="text" placeholder="black" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="breed" value="Breed" />
                </div>
                <TextInput id="breed" type="text" placeholder="criole" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="birthdate" value="Birthdate" />
                </div>
                <TextInput id="birthdate" type="date" placeholder="20/05/2022" required />
            </div>
            <div>
            <div className="mb-2 block">
                    <Label htmlFor="avatar" value="Avatar" />
                </div>
                <TextInput id="avatar" type="text" placeholder="choose on file" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput id="description" type="text" placeholder="this is old and sick..." required />
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}

