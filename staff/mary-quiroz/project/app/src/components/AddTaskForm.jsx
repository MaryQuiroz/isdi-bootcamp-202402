import { Button, Label, Select, TextInput } from 'flowbite-react';
import React, { useContext } from 'react';
import createTask from '../logic/createTask';
import { AppContext } from '../context/AppContext';

export const AddTaskForm = ({ setShowModal, catId }) => {
    const { setTasks, showFeedback } = useContext(AppContext);

    const onAddTaskHandler = event => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const description = form.description.value;
        const priority = form.priorities.value;
        const concurrency = form.concurrency.value;
        const dueDate = form.dueDate.value;

        const task = {
            title,
            description,
            priority,
            concurrency,
            dueDate,
        };

        // Llamada a createTask
        createTask(catId, task)
            .then(newTask => {
                // Resetea el formulario
                form.reset();
                
                setShowModal(false);

                // Actualiza el estado de las tareas, añadiendo la nueva tarea
                setTasks(prevTasks => [...prevTasks, newTask]);
            })
            .catch(error => showFeedback(error, 'error'));
    };

    return (
        <form onSubmit={onAddTaskHandler} className="flex max-w flex-col gap-2">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" value="Title" />
                </div>
                <TextInput id="title" type="text" placeholder="Buy food" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Description" />
                </div>
                <TextInput id="description" type="text" placeholder="buy food at Mercadona" required />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="priorities" value="Select your Priority" />
                </div>
                <Select id="priorities" required>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="concurrency" value="Select Concurrency" />
                </div>
                <Select id="concurrency" required>
                    <option value="None">Select concurrency (optional)</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="dueDate" value="DueDate" />
                </div>
                <TextInput id="dueDate" type="date" required />
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
};