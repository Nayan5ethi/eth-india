import { useContext} from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { Route, useNavigate,Outlet } from 'react-router-dom';
import { UserWalletContext } from "../../context/userWalletContext";

export const AuthenticatedRoute =  ({ children })  => {
    const { selectedAccount } = useContext(UserWalletContext);
    if(selectedAccount==="" || selectedAccount===null || typeof selectedAccount==="undefined")
    {
        return <Navigate to="/sdasa" />
    } 
    return <Outlet /> ;
}