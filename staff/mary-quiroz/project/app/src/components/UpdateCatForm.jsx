import React, { useContext, useRef } from 'react'
import { AppContext } from '../context/AppContext'
import { Button, Label, TextInput } from 'flowbite-react'
import updateCat from '../logic/updateCat'

export default function UpdateCatForm({ setShowModal }) {
    const { cats, cat, setCats } = useContext(AppContext)
    const nameRef = useRef(null)
    const colorRef = useRef(null)
    const breedRef = useRef(null)
    const avatarRef = useRef(null)
    const descriptionRef = useRef(null)

    const onUpdateHandler = () => {
        event.preventDefault()
        const form = event.target

        const id = cat.id
        const name = form.name.value
        const color = form.color.value
        const breed = form.breed.value
        const avatar =  form.avatar.value
        const description = form.description.value
        const catUpdateData = {
            id,
            name,
            color,
            breed,
            avatar,
            description
        }

        try {
            updateCat(catUpdateData)
                .then(updatedCat => {
                    form.reset()
                setCats(cats.map(cat => cat.id === updatedCat.id ? updatedCat : cat))
                setShowModal(false)

                })

                .catch(error => showFeedback(error, 'error'))
            } catch (error) {
                showFeedback(error, 'error')
            }
        }

    return (
        <form onSubmit={onUpdateHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput  id="name" type="text" placeholder="chimuelo" defaultValue={cat.name} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="color" value="Color" />
                </div>
                <TextInput  id="color" type="text" placeholder="black" defaultValue={cat.color} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="breed" value="Breed" />
                </div>
                <TextInput  id="breed" type="text" placeholder="criole" defaultValue={cat.breed} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="avatar" value="Avatar" />
                </div>
                <TextInput  id="avatar" type="text" placeholder="choose on file" defaultValue={cat.avatar} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput  id="description" type="text" placeholder="this is old and sick..." defaultValue={cat.description} required />
            </div>
            <Button type="submit">Update</Button>
        </form>
    )
}