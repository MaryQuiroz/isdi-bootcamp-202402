import { useState } from "react";
import { AppContext } from "./context/AppContext";

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [cats, setCats] = useState([])
    const [tasks, setTasks] = useState([])
    const [stateModal, setStateModal] = useState(false)

  
    // Funciones para actualizar el estado
    const updateUser = (newUser) => setUser(newUser);
    const addCat = (newCat) => setCats([newCat, ...cats]);
    const addCats = (dbCats) => setCats([...cats, ...dbCats]);
    const addTask = (newTask) => setTasks([...tasks, newTask]);
    const changeStateModal = (state) => setStateModal(state)

  
    // Valor del contexto
    const contextValue = {
      user,
      cats,
      tasks,
      stateModal,
      updateUser,
      addCat,
      addCats,
      addTask,
      changeStateModal
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };
  