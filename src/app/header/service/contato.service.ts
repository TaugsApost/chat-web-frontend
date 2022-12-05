import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from 'src/app/lista-conversas/model/chat-web-model.model';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService extends BaseService<Contato, Contato>{

  constructor(private _http: HttpClient) {
    super('contato', _http);
  }

  deletarContato(contato: Contato): Observable<any> {
    return this._http.delete(this.url + '/excluir', { body: contato, responseType: 'text' });
  }

}
