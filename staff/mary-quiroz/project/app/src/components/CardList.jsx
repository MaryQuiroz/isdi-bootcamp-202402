import React from 'react'

export const CardList = ({ data, renderCard }) => {
  return (
    <div className='ml-8 mr-8 mb-8'>
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-grow pb-30">
    {data && data.map((element, index) => renderCard(element, index))}
          </ul>
    
    </div>
  );
}
