import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/utils/classes-bases/service.service';
import { MensagemChat, Mensagem, MensagemGrupo } from '../model/chat-web-model.model';

@Injectable({
  providedIn: 'root'
})
export class MensagemService extends BaseService<Mensagem, Mensagem>{

  constructor(private _http: HttpClient) {
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

}
