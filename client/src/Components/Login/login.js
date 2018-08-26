import React from 'react';
import LoginContainer from './LoginContainer';
import { CookiesProvider } from 'react-cookie';

export const Login = (match) => {
    return (
        <div>
            <h1>LOGIN</h1>
            <CookiesProvider>
                <LoginContainer />
            </CookiesProvider>
        </div>
    );
};
