import { useState } from "react";
import { AppContext } from "./context/AppContext";

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [cat, setCat] = useState(null)
    const [cats, setCats] = useState([])
    const [tasks, setTasks] = useState([])

  
    // Funciones para actualizar el estado
    const updateUser = (newUser) => setUser(newUser);
    const addCat = (newCat) => setCats([newCat, ...cats]);
    const updateCats = (dbCats) => setCats([...cats, ...dbCats]);
    const deleteCat = (cats) => setCats(cats);


  
    // Valor del contexto
    const contextValue = {
      user,
      cats,
      tasks,
      cat,
      updateUser,
      addCat,
      updateCats,
      deleteCat,
      setCat,
      setCats,
      setTasks,
      
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };
  