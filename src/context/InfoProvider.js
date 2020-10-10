import React, { useContext, useReducer} from 'react';

const InfoContext = React.createContext();

const InfoProvider = ({Reducer, initialState, children})=>{
    
    return(
        <InfoContext.Provider value = {useReducer(Reducer, initialState)}>
            {children}
        </InfoContext.Provider>
    )
}

const useStateValue = () => useContext(InfoContext);

export { InfoContext, InfoProvider, useStateValue}