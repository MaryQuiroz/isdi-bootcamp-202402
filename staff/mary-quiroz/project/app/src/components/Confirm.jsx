import { Button } from 'flowbite-react';
import React, { useRef, useEffect } from 'react';

const Confirm = ({ setShowModal, onDelete }) => {
  const yesButtonRef = useRef(null);

  useEffect(() => {
    if (yesButtonRef.current) {
      yesButtonRef.current.focus();
    }
  }, []);

  return (
    <div className="flex justify-between mt-4 space-x-3 lg:mt-6">
      <Button
        className="bg-red-500 text-white w-full"
        ref={yesButtonRef}
        onClick={onDelete}
      >
        YES
      </Button>
      <Button className="w-full" onClick={() => setShowModal(false)}>
        NO
      </Button>
    </div>
  );
};

export default Confirm;
