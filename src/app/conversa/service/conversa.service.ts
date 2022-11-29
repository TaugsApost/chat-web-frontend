import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversa } from 'src/app/lista-conversas/model/chat-web-model.model';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class ConversaService extends BaseService<Conversa, Conversa>{

  constructor(private _http: HttpClient) {
    super('home', _http);
  }
}
