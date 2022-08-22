import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

function RequireAuth({ children }: React.PropsWithChildren) {
    let isAuth = useSelector((state: RootState) => state.data.isAuth)
    let location = useLocation();
  
    if (!isAuth) {
        return <Navigate to={`/login?redirect=${location.pathname.replace('/', '')}` } replace />;
    }
  
    return (
        <>
            {children}
        </>
    ) 
  }

export default RequireAuth