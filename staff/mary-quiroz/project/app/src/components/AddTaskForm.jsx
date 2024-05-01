import { Button, Checkbox, Label, Select, TextInput } from 'flowbite-react'
import React from 'react'

export const AddTaskForm = () => {
    return (
        <form onSubmit={onSaveHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="tittle" value="Title" />
                </div>
                <TextInput id="tittle" type="title" placeholder="Buy food" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput id="description" type="text" placeholder="buy food at Mercadona" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="priority" value="Select your Priority" />
                </div>
                <Select id="priorities" required>
                    <option>High</option>
                    <option>Hedium</option>
                    <option>Low</option>
                </Select>

            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="completed"/>
                    <Checkbox id="completed"/>
                </div>
                <TextInput id="age" type="date" placeholder="20/05/2022" required />
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}
