import { Injectable } from '@angular/core';
import { Conversa, Grupo, MensagemGrupo, Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'usuario';
const USERNAME_KEY = 'username';
const NOME_CONTATO_KEY = 'nome_contato';
const USERNAME_CONTATO_KEY = 'username_contato';
const CONVERSA_KEY = 'conversa';
const GRUPO_KEY = 'grupo';
const MENSAGENS_GRUPO_KEY = 'msg_grupo';
const PARTICIPANTE_KEY = 'participante';


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
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        window.sessionStorage.setItem(USERNAME_KEY, user.username);
    }

    public saveConversa(conversa: Conversa) {
        window.sessionStorage.removeItem(CONVERSA_KEY);
        window.sessionStorage.removeItem(USERNAME_CONTATO_KEY);
        window.sessionStorage.removeItem(NOME_CONTATO_KEY);
        window.sessionStorage.setItem(CONVERSA_KEY, JSON.stringify(conversa));
        window.sessionStorage.setItem(USERNAME_CONTATO_KEY, conversa.username2);
        window.sessionStorage.setItem(NOME_CONTATO_KEY, this.nomeContato(conversa.username2));
    }

    public saveGrupo(grupo: Grupo, mensagens: MensagemGrupo[]) {
        window.sessionStorage.removeItem(GRUPO_KEY);
        window.sessionStorage.setItem(GRUPO_KEY, JSON.stringify(grupo));
        this.saveMensagensGrupo(mensagens);
    }

    public saveMensagensGrupo(mensagens: MensagemGrupo[]) {
        window.sessionStorage.removeItem(MENSAGENS_GRUPO_KEY);
        window.sessionStorage.setItem(MENSAGENS_GRUPO_KEY, JSON.stringify(mensagens));
    }

    public nomeContato(username: string): string {
        let contato = this.getUser().listaDeContatos.find(c => c.usernameContato == username);
        if (contato != null) {
            return contato.nomeContato
        } else {
            return username;
        }
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

    public getConversa(): Conversa {
        const conversa = window.sessionStorage.getItem(CONVERSA_KEY);
        if (conversa) {
            return JSON.parse(conversa);
        }
        return new Conversa;
    }

    public getNomeContato(): string {
        const nome = window.sessionStorage.getItem(NOME_CONTATO_KEY);
        if (nome) {
            return nome;
        }
        return '';
    }

    public getUsernameContato(): string {
        const username = window.sessionStorage.getItem(USERNAME_CONTATO_KEY);
        if (username) {
            return username;
        }
        return '';
    }

    public getGrupo(): Grupo {
        const grupo = window.sessionStorage.getItem(GRUPO_KEY);
        if (grupo) {
            return JSON.parse(grupo);
        }

        return new Grupo;
    }

    public getMensagensGrupo(): MensagemGrupo[] {
        const mensagens = window.sessionStorage.getItem(MENSAGENS_GRUPO_KEY);
        if (mensagens) {
            return JSON.parse(mensagens);
        }

        return ([] as MensagemGrupo[]);
    }
}