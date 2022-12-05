import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class ModalUsuarioService extends BaseService<Usuario, Usuario>{

  constructor(private _http: HttpClient) {
    super('usuario', _http)
  }
}
