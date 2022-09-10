import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { IUser } from "../interface";
import { useLogoutMutation } from "../redux/api/Auth";
import { setToken, unsetToken } from "../redux/slice/OtherData";
import { useGetUserQuery } from "../redux/api/User";
import { RootState } from "../redux/store";

interface AuthContextType {
    signIn: (user: string, callback: VoidFunction) => void;
    signout?: any
  }

const AuthContext = createContext<AuthContextType>(null!)


export function AuthProvider({ children }: React.PropsWithChildren){
    let [logout] = useLogoutMutation({
        fixedCacheKey: 'logout',
    })
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let token = useSelector((state: RootState) => state.data.token)

    function signIn(token: string, callback: VoidFunction){
        dispatch(setToken(token))
        callback()
    }

    async function signout(){
        try{
            let data = await logout().unwrap()
            if(data.status === 'success'){
                navigate('/', {replace: true})
                dispatch(unsetToken())
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <AuthContext.Provider value={{
            signIn,
            signout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext)
}