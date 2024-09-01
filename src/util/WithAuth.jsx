import { Navigate, Outlet } from "react-router-dom"


const WithAuth = ({ redirectPath }) => {
    const token = localStorage.getItem('toke');
    console.log(token);

    if (!token) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />
}

export default WithAuth