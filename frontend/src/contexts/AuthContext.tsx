import { createContext, ReactNode, useState } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from "next/router";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | undefined>(undefined);
    const isAuthenticated = !!user; // controle de "boolean" se estiver logado ou nao.

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            // console.log(response.data)

            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expira em 1 mes
                path: "/" // quais caminhos terao acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            // passar para proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redirecionar o user para /dashbord
            Router.push('/dashbord')

        } catch(err) {
            console.log("Error ao acessar", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}