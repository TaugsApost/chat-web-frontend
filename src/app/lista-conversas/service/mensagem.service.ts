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

  listarConversas(username: string): Observable<MensagemChat[]> {
    return this._http.post<MensagemChat[]>(this.url + '/listarConversas', username);
  }

}