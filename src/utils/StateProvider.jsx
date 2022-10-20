import { createContext, useContext, useReducer } from "react";
import React from 'react';


export const StateContext = createContext();

export function StateProvider({children, intialState, reducer}) {
  return (
    <StateContext.Provider value={useReducer(reducer, intialState)}>
        {children}
    </StateContext.Provider>
  )
}


export const useStateProvider = () => useContext(StateContext);

