import { Button, Label, Modal, TextInput } from "flowbite-react"
import { useState } from "react";
import createCat from "../logic/createCat"
import { InfoCatComponent } from "./InfoCat"


export const ModalComponent = () => {
    const [openModal, setOpenModal] = useState(false);
    const [catInfo, setCatInfo] = useState(null)

    const calculateAge=(date)=>{
        return new Date().getFullYear() - new Date(date).getFullYear()
    }
    const onSaveHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const color = form.color.value
        const breed = form.breed.value
        const age = calculateAge(form.age.value)
        const avatar = form.avatar.value

        setCatInfo([ name, color, breed, age, avatar ])
    
        setOpenModal(false)
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Add Cat</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Cat</Modal.Header>
                <Modal.Body>
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
                                <Label htmlFor="age" value="Birthdate" />
                            </div>
                            <TextInput id="age" type="date" placeholder="20/05/2022" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="avatar" value="Avatar" />
                            </div>
                            <TextInput id="avatar" type="file" placeholder="choose on file" required />
                        </div>
                        <Button type="submit">Save</Button>
                    </form>

                </Modal.Body>

            </Modal>
            {catInfo && (
                <InfoCatComponent catInfo={catInfo}/>
            )}

        </>
    );
}
