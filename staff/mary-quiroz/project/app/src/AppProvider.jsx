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
    const updateCats = (dbCats) => setCats([...cats, ...dbCats]);
    const deleteCats = (cats) => setCats(cats);
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
      updateCats,
      addTask,
      changeStateModal,
      deleteCats
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };
  