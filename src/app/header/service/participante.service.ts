import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Participante } from 'src/app/lista-conversas/model/chat-web-model.model';
import { BaseService } from 'src/app/utils/classes-bases/service.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService extends BaseService<Participante, Participante>{

  constructor(private _http: HttpClient) {
    super('participante', _http);
  }

  salvarParticipantes(participantes: Participante[]): Observable<Participante[]> {
    return this._http.post<Participante[]>(this.url + '/salvarParticipantes', participantes);
  }
}
