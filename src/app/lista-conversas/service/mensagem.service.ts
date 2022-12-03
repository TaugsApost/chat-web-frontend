import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/login/service/storege.service';
import { BaseService } from 'src/app/utils/classes-bases/service.service';
import { MensagemChat, Mensagem, MensagemGrupo } from '../model/chat-web-model.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemService extends BaseService<Mensagem, Mensagem>{

  constructor(private _http: HttpClient, private storageService: StorageService) {
    super('mensagem', _http)
  }

  listarConversas(username: string, filtro: string): Observable<MensagemChat[]> {
    return this._http.post<MensagemChat[]>(this.url + '/listarConversas', { username: username, filtro: filtro });
  }

  salvarMensagemChat(mensagem: MensagemChat): Observable<MensagemChat> {
    return this._http.post<MensagemChat>(this.url + '/salvarMensagemChat', mensagem);
  }


  salvarMensagemGrupo(mensagem: MensagemGrupo): Observable<MensagemGrupo> {
    return this._http.post<MensagemGrupo>(this.url + '/salvarMensagemGrupo', mensagem);
  }

  listarMensagensGrupo(idGrupo: number): Observable<MensagemGrupo[]> {
    return this._http.post<MensagemGrupo[]>(this.url + '/listarMensagensGrupo', idGrupo);
  }

  listarGrupos(): Observable<MensagemGrupo[]> {
    return this._http.post<MensagemGrupo[]>(this.url + '/criarListaGrupos', this.storageService.getUsername());
  }

  buscarTodasMensagensGrupoUsuario(): Observable<MensagemGrupo[]> {
    return this._http.post<MensagemGrupo[]>(this.url + '/buscarMensagensGrupoUsuario', this.storageService.getUsername());
  }

  deletarMensagemChat(id: number): Observable<String> {
    return this._http.post<String>(this.url + '/deletarMensagemChat', id);
  }

}
