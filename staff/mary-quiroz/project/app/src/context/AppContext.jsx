import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState(null)

  const [feedback, setFeedback] = useState(null);

  const addCat = (newCat) => setCats([newCat, ...cats]);

  const showFeedback = (message, level = 'info') => {
    setFeedback({ message, level });
    setTimeout(() => setFeedback(null), 3000); // Ocultar el feedback después de 3 segundos
  };

  return (
    <AppContext.Provider value={{ tasks, setTasks, cats, setCats, setCat, cat, addCat, showFeedback, feedback }}>
      {children}
    </AppContext.Provider>
  );
};
