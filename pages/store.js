import React, {useState} from 'react'

export const Context = React.createContext()

const Store = ({children}) => {
    const [state, setState] = useState({progress: 0})

    return (
        <Context.Provider value={[state, setState]}>{children}</Context.Provider>
    )

}

export default Store