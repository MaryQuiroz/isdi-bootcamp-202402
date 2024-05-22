import { Tabs } from 'flowbite-react';
import React, { useEffect, useState } from 'react'



export const TabsComponent = () => {
  const [taskType, setTaskType] = useState('overdue')

  useEffect(() => {
    console.log("useEffect", taskType )
  }, [taskType])
  
  const onClickHandler = () => {
    const tabId = event.target.id
    const taskMode = {
      ':r4:-tab-0': 'overdue',
      ':r4:-tab-1': 'current',
      ':r4:-tab-2': 'finished',

    }

    setTaskType(taskMode[tabId])


    console.log("onClickHandler",taskType)
  }
  return (
    
   <Tabs aria-label="Default tabs" style="default" onClick={onClickHandler}>
      <Tabs.Item active title="Overdue" >
        This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling. {taskType}
      </Tabs.Item>
      <Tabs.Item title="Current">
        This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.{taskType}
      </Tabs.Item>
      <Tabs.Item title="Finished">
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.{taskType}
      </Tabs.Item>
    
    </Tabs>
  );
}

  