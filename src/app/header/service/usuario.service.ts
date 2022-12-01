import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario, Usuario>{

  constructor(private _http: HttpClient, private storageService: StorageService) {
    super('usuario', _http);
  }

  buscarPorUsername(): Observable<Usuario> {
    return this._http.post<Usuario>(this.url + '/detalhar', { username: this.storageService.getUsername() });
  }
}
