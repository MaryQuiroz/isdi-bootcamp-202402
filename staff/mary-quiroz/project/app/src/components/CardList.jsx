import React from 'react'

export const CardList = ({ data, renderCard }) => {
  return (
    <>
      {data.map((element, index) => renderCard(element, index))}
    </>
  );
}
