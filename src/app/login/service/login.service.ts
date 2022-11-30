import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/lista-conversas/model/chat-web-model.model';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class LogarService extends BaseService<Login, Login>{

  constructor(private _http: HttpClient) {
    super('usuario', _http);
  }

  logar(login: Login): Observable<any> {
    return this._http.post(this.url + '/logar', login);
  }



}
