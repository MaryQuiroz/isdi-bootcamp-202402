#Pety App

## Intro

This project is an application designed to help cat owners manage and care for their friends. The application includes essential features such as cat profiles and task lists.

![](https://media.giphy.com/media/x90dwDUuUx9Ys/giphy.gif?cid=ecf05e47lr1rdtzx91y7ufg8cxoybmcniasi9tza63cpweyj&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- cat Profile: Provide the option to add at least one cat, with basic details such as name, breed  and age

- Task List: Implement a basic task list function where users can add, mark as completed, and delete tasks related to cat care. Tasks can be generic at the beginning, such as "buy food," "veterinarian visit," etc.



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
- flowBite

### Data Model
User
- id (objectId, required)
- name (string, required)
- birthdate (date, required)
- email (string, required)
- username (string, required)
- password (string, required)
- avatar (string, optional)

Cat
- id (objectId, requiered)
- name (string, required)
- color (string, required)
- breed (string, required)
- age (number, required)
- user id (objectId, required)

Task
- id (objectId, required)
- name (string, required)
- description (string, required)
- due date (date, required)
- completed (boolean, required, default false)
- cat id (objectId, required)

