import { createContext, useContext as useReactContext } from 'react'

export const AppContext = createContext(null)
export const Context = createContext()

export const useContext = () => useReactContext(Context)