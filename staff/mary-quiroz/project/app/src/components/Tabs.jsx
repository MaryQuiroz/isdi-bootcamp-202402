import { Tabs } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import retrieveTasks from '../logic/retrieveTasks';
import { Task } from './Task';
import { CardList } from './CardList';

export const TabsComponent = () => {
  const { catId } = useParams();

  const [taskType, setTaskType] = useState('overdue');
  const { tasks, setTasks } = useContext(AppContext);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);

  // Cargar tareas iniciales cuando el componente se monta
  useEffect(() => {
    retrieveTasks(catId).then(setTasks);
  }, [catId, setTasks]);

  // Filtrar tareas cada vez que se actualicen las tareas o el tipo de tarea
  useEffect(() => {
    filterByState(taskType);
  }, [taskType, tasks]);

  const onClickHandler = (event) => {
    const tabId = event.target.id;
    const taskMode = {
      ':r4:-tab-0': 'overdue',
      ':r4:-tab-1': 'current',
      ':r4:-tab-2': 'finished',
    };

    setTaskType(taskMode[tabId]);
  };

  const filterByState = (state) => {
    const currentDate = new Date();
    const overdue = [];
    const current = [];
    const finish = [];

    tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      const completed = task.completed;

      if (completed) {
        // Si la tarea está completada, se agrega a "finished"
        finish.push(task);
      } else {
        // Si no está completada, determinar si es overdue o current
        if (dueDate < currentDate) {
          overdue.push(task);
        } else {
          current.push(task);
        }
      }
    });

    setOverdueTasks(overdue);
    setCurrentTasks(current);
    setFinishedTasks(finish);
  };

  const renderCatCard = (task, index) => (
    <Task key={index} task={task} />
  );

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
  );
};