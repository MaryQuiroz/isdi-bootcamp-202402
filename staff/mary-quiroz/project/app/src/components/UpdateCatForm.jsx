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

    const onUpdateHandler = async () => {
        event.preventDefault()
        const catUpdateData = {
            _id: cat._id,
            name: nameRef.current.value,
            color: colorRef.current.value,
            breed: breedRef.current.value,
            avatar: avatarRef.current.value,
            description: descriptionRef.current.value,
        }

        try {
            const updatedCat =  await updateCat(catUpdateData)
            setCats(cats.map(cat => cat._id === updatedCat._id ? updatedCat : cat))
            setShowModal(false)
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <form onSubmit={onUpdateHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput ref={nameRef} id="name" type="text" placeholder="chimuelo" defaultValue={cat.name} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="color" value="Color" />
                </div>
                <TextInput ref={colorRef} id="color" type="text" placeholder="black" defaultValue={cat.color} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="breed" value="Breed" />
                </div>
                <TextInput ref={breedRef} id="breed" type="text" placeholder="criole" defaultValue={cat.breed} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="avatar" value="Avatar" />
                </div>
                <TextInput ref={avatarRef} id="avatar" type="text" placeholder="choose on file" defaultValue={cat.avatar} required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput ref={descriptionRef} id="description" type="text" placeholder="this is old and sick..." defaultValue={cat.description} required />
            </div>
            <Button type="submit">Update</Button>
        </form>
    )
}