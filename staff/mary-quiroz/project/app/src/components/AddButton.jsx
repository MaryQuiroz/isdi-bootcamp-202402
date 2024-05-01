import { Button } from 'flowbite-react';
import React from 'react';

export const AddButton = ({ text, onClick }) => {
  return (
    <div className="flex flex-col items-center pb-10">
      <Button onClick={onClick}>{text}</Button>
    </div>
  );
};
