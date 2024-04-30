#Pety App

## Intro

This project is an application designed to help cat owners manage and care for their friends. The application includes essential features such as cat profiles and task lists.

![](https://media.giphy.com/media/x90dwDUuUx9Ys/giphy.gif?cid=ecf05e47lr1rdtzx91y7ufg8cxoybmcniasi9tza63cpweyj&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- add cat (provide the option to add at least one cat, with basic details such as name, color, breed  and age)
- edit cat (change information)
- remove cat 
- list cats
- list tasks (function where users can add, mark as completed, and delete tasks related to cat care, such as "buy foot", "buy flea collar", "veterinarian visit," etc.)
- add task
- mark task (done)
- delete task
- edit task

- Task List: Implement task list 


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
- email (string, required)
- password (string, required)
- avatar (string, optional)

Cat
- id (objectId, requiered)
- name (string, required)
- color (string, required)
- breed (string, required)
- age (number, required)
- avatar (string, optional)
- user (objectId, required, User.id)

Task
- id (objectId, required)
- title (string, required)
- description (string, required)
- dueDate (date, required)
- completed (boolean, required, default false)
- cat (objectId, required, Cat.id)

