import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
    const isToken = !!localStorage.getItem('AUTH_TOKEN');

    if (isToken) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default AuthLayout;
