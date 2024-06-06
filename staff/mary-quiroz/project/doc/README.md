#Pety App

## Intro

This project is an application designed to help cat owners manage and care for their friends. The application includes essential features such as cat profiles and task lists.

![](https://media.giphy.com/media/7NoNw4pMNTvgc/giphy.gif?cid=790b761169xwn81yebqu4fsovj3jfdedw2yzcoqblt7yl4r5&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- add cat (provide the option to add at least one cat, with basic details such as name, color, breed  and birthdate )
- search cat
- edit cat (change information)
- remove cat 
- list cats
- list tasks (function where users can add, mark as completed, and delete tasks related to cat care, such as "buy foot", "buy flea collar", "veterinarian visit," etc.)
- add task
- change task status (overdue, current and finished)
- select concurrency (daily, weekly, monthly, yearly)
- mark task (done)
- delete task
- Task List: Implement task list 

## Technical Description

### Modules 
- api (server logic)
- app (client interface)
- com (common utils, tools, ...)

### Technologies

- TypeScript
- Vite
- React
- Express.js
- Node
- Tailwind
- Mongoose
- flowBite

### Data Model
User
- id (objectId, required)
- name (string, required)
- email (string, required)
- password (string, required)

Cat
- id (objectId, requiered)
- name (string, required)
- color (string, required)
- breed (string, required)
- birthdate (Date, required)
- avatar (string, optional)
- description (string, optional)
- user (objectId, required, User.id)

Task
- id (objectId, required)
- title (string, required)
- description (string, required)
- priority (string, required)
- completed (boolean, required, default false)
- concurency (none, daily, weekly, monthly, yearly)
- cat (objectId, required, Cat.id)

