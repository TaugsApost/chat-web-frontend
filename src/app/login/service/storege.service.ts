import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'usuario';
const USERNAME_KEY = 'username';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }

    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: Usuario): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        window.sessionStorage.setItem(USERNAME_KEY, user.username);
    }

    public isLoggin() {
        let user = window.sessionStorage.getItem(USER_KEY);
        return user != null;
    }

    public getUser(): Usuario {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return new Usuario;
    }

    public getUsername(): string {
        const username = window.sessionStorage.getItem(USERNAME_KEY);
        if (username) {
            return username;
        }
        return '';
    }
}