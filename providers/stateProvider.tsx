import React, { createContext, useLayoutEffect, useReducer } from 'react'
import { stateReducer } from '../state/reducer';
import type { State, Action } from '../state/reducer';
import { useLocalStorage } from '../hooks/local-storage.hook';
import type{ IStudent } from '../@types';

interface IProps {
  children: React.ReactNode;
}

interface IStateContext {
  state: State;
  loading: boolean;
  dispatch: React.Dispatch<Action>;
}

const INTI_STATE = { state: { totalAbsents: 0, studentsList: [] }, loading: true, dispatch: () => { } };
// eslint-disable-next-line react-refresh/only-export-components
export const StateContext = createContext<IStateContext>(INTI_STATE);

export const StateProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(stateReducer, { studentsList: [], totalAbsents: 0 });
  const { storedData, loading } = useLocalStorage(state.studentsList, 'students-list');

  useLayoutEffect(() => {
    if (!loading) {
      const stdList: IStudent[] = storedData || [];
      dispatch({ type: "INIT", payload: stdList });
    }
  }, [loading, storedData]);

  return (
    <StateContext.Provider value={{ state, loading, dispatch }}>{props.children}</StateContext.Provider>
  )
}

// export default StateProvider




// import React, { createContext, useLayoutEffect, useReducer } from "react";
// import { stateReducer } from "../state/reducer";
// import type { State, Action } from "../state/reducer";
// import { useLocationStorage } from "../hooks/local-storage.hook";
// import type { IStudent } from "../@types";

// interface IProps {
//     children: React.ReactNode;
// }

// interface IStateContext {
//     state: State;
//     loading: boolean;
//     dispatch: React.Dispatch<Action>;
// }

// const INIT_STATE = {state: {totalAbsents: 0, studentsList: []}, loading: true, dispatch: () => { } };
// //eslint-disable-next-line react-refresh/only-export-components
// export const StateContext = createContext<IStateContext>(INIT_STATE);

// export const StateProvider = (props: IProps) => {
//     const [state, dispatch] = useReducer(stateReducer, { studentsList: [], totalAbsents: 0});
//     const { storedData, loading } = useLocationStorage(state.studentsList, 'student-list');

//     useLayoutEffect (() => {
//         if (!loading) {
//             const stdList: IStudent[] = storedData || [];
//             dispatch({ type: "INIT", payload: stdList});
//         }
//     }, [loading, storedData]);
//     return (
//         <StateContext.Provider value={{ state, loading, dispatch}}>{props.children}</StateContext.Provider>
//     )
// }