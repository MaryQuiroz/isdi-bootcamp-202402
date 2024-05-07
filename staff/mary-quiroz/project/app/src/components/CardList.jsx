import React from 'react'

export const CardList = ({ data, renderCard }) => {
  return (
    <>
    <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-grow">
    {data.map((element, index) => renderCard(element, index))}
          </ul>
    
    </>
  );
}
