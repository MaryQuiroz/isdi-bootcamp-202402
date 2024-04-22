#Pety App

## Intro

This project is an application designed to help pet owners manage and care for their friends. The application includes essential features such as pet profiles, task lists, and reminders.

![](https://media.giphy.com/media/x90dwDUuUx9Ys/giphy.gif?cid=ecf05e47lr1rdtzx91y7ufg8cxoybmcniasi9tza63cpweyj&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- Basic Pet Profile: Provide the option to add at least one pet, with basic details such as name, type (dog, cat, etc.), and age

- Task List: Implement a basic task list function where users can add, mark as completed, and delete tasks related to pet care. Tasks can be generic at the beginning, such as "buy food," "veterinarian visit," etc.

- Reminders: A simple functionality to set reminders for critical tasks, such as vet appointments or when to buy more food. Reminders can be email notifications to keep it simple.

### UI Design

[Figma]()

## Technical Description

### Modules 
- api (server logic)
- app (client interface)
- com (common utils, tools, ...)

### Technologies

- TypeScript
- React
- Express
- Node
- Tailwind
- Mongo
- ...

### Data Model
User
- id (required)
- name (string, required)
- birthdate (date, required)
- email (string, required)
- username (string, required)
- password (string, required)
- avatar (string, optional)

Cat
- id (primary key)
- name (string, required)
- type (string, required)
- breed (string, optional)
- age (number, required)
- medical history id (foreign key)
- user id (foreign key)

Task
- id (primary key)
- name (string, required)
- description (string, required)
- due date (date, required)
- completed (boolean, required, default false)
- pet id (foreign key)

Reminder
- id (primary key)
- reminder date (date, required)
- task id (foreign key)
- MedicalHistory
- id (primary key)
- vaccinations (string, optional)
- illnesses (string, optional)
- medications (string, optional)
- vet visits (string, optional)
- pet id (foreign key)
