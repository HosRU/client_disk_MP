import { Navigate } from "react-router-dom";

export default function AuthPrivate({children, isLoggedIn}){
    if(!isLoggedIn){
        return <Navigate to="/authForm"></Navigate>
    }

    return children
}