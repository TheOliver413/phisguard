import React, {createContext} from "react";
import { useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}