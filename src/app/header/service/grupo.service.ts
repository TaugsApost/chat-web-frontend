import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends BaseService<Grupo, Grupo>{

  constructor(private _http: HttpClient, private storageService: StorageService) {
    super('grupo', _http);
  }

  buscarPorUsuario(): Observable<Grupo[]> {
    return this._http.post<Grupo[]>(this.url + '/buscarPorUsuario', this.storageService.getUsername());
  }

}
