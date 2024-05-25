import { Button, Label, TextInput } from 'flowbite-react'
import React, { useContext, useRef } from 'react'
import createCat from '../logic/createCat'
import { AppContext } from '../context/AppContext'
import { logger } from '../utils'


export const AddCatForm = ({setShowModal}) => {
    const { addCat } = useContext(AppContext)

    const nameRef = useRef(null)
    const colorRef = useRef(null)
    const breedRef = useRef(null)
    const birthdateRef = useRef(null)
    const avatarRef = useRef(null)
    const descriptionsRef = useRef(null)

    const onSaveHandler =  async () => {
        try {
        event.preventDefault()
        const name = nameRef.current.value
        const color = colorRef.current.value
        const breed = breedRef.current.value
        const birthdate = birthdateRef.current.value
        const avatar = avatarRef.current.value
        const description = descriptionsRef.current.value

        const catData = {
            name, 
            color,
            breed,
            birthdate,
            avatar,
            description
        }
       
        const cat = await createCat(catData)
            addCat(cat)
            setShowModal(false)
        } catch (error) { 
            logger.error(error)
        }
    

    }
    return (
        <form onSubmit={onSaveHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput  ref= {nameRef} id="name" type="text" placeholder="chimuelo" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="color" value="Color" />
                </div>
                <TextInput ref= {colorRef} id="color" type="text" placeholder="black" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="breed" value="Breed" />
                </div>
                <TextInput ref= {breedRef} id="breed" type="text" placeholder="criole" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="birthdate" value="Birthdate" />
                </div>
                <TextInput ref= {birthdateRef} id="birthdate" type="date" placeholder="20/05/2022" required />
            </div>
            <div>
            <div className="mb-2 block">
                    <Label htmlFor="avatar" value="Avatar" />
                </div>
                <TextInput ref= {avatarRef} id="avatar" type="text" placeholder="ex: www.imgen.com/" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput ref={descriptionsRef} id="description" type="text" placeholder="It's my first adopted cat
                ..." required />

            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}

