import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext'

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401) {
            // qualquer error 401 (not authorized) devemos deslogar o usuario.
            if(typeof window != undefined){
                // chamando a função para deslogar o usuario.
                signOut();
            } else {
              return Promise.reject(new AuthTokenError())
            }
        }
        
        return Promise.reject(error);
    })

    return api;

}