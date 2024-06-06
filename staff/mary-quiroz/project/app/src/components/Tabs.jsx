import { Tabs } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import retrieveTasks from '../logic/retrieveTasks';
import { Task } from './Task';
import { CardList } from './CardList';

export const TabsComponent = () => {
  const { catId } = useParams()

  const [taskType, setTaskType] = useState('overdue')
  const { tasks, setTasks } = useContext(AppContext)
  const [overdueTasks, setOverdueTasks] = useState([])
  const [currentTasks, setCurrentTasks] = useState([])
  const [finishedTasks, setFinishedTasks] = useState([])

  useEffect(() => {
    retrieveTasks(catId).then(setTasks)
    filterByState(taskType)
  }, [])

    useEffect(() => {
      filterByState(taskType)
    }, [taskType, tasks])
  
  const onClickHandler = (event) => {
    const tabId = event.target.id
    console.log(tabId)
    const taskMode = {
      ':r4:-tab-0': 'overdue',
      ':r4:-tab-1': 'current',
      ':r4:-tab-2': 'finished',

    }

    setTaskType(taskMode[tabId])
  }

  const filterByState = (state) => {
    const currentDate = new Date()
    const overdue = []
    const current = []
    const finish = []
    if (state === 'finished') {
      setFinishedTasks(tasks.filter(task => task.taskCompleted))
    }
    tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      const completed = task.completed;
      if (!completed) {
        if (dueDate < currentDate) {
          overdue.push(task);
        } else
          current.push(task);
      }else{
        finish.push(task);
      }
    }
    )

    setOverdueTasks(overdue)
    setCurrentTasks(current)
    setFinishedTasks(finish)

  }
  const renderCatCard = (task, index) => (
    <Task key={index} task={task} />
  )
  return (
    <div className="w-full items-center">
      <Tabs aria-label="Default tabs" style="default" className="flex w-full" onClick={onClickHandler}>
        <Tabs.Item active title="Overdue" className="flex-1 text-center">
          {
            overdueTasks.length === 0 ? <h3 className='text-center'>There are no tasks yet</h3> : <CardList data={overdueTasks} renderCard={renderCatCard} />
          }

        </Tabs.Item>
        <Tabs.Item title="Current" className="flex-1 text-center">
          {
            currentTasks.length === 0 ? <h3 className='text-center'>There are no tasks yet</h3> : <CardList data={currentTasks} renderCard={renderCatCard} />
          }


        </Tabs.Item>
        <Tabs.Item title="Finished" className="flex-1 text-center">
          {
            finishedTasks.length === 0 ? <h3 className='text-center'>There are no tasks yet</h3> : <CardList data={finishedTasks} renderCard={renderCatCard} />
          }


        </Tabs.Item>
      </Tabs>
    </div>
  )
}