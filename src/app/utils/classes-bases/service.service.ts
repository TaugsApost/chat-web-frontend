import { empty, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as packageInfo from '../links/estrutura-links.json'

export abstract class BaseService<Filter, Entity>{

    private urlSalvar: string;
    private urlListar: string;
    private urlExcluir: string;
    private urlBuscar: string;
    private urlDetalhar: string;
    private urlEditar: string;
    private restMap = packageInfo;
    private http: HttpClient;
    url: string;

    constructor(caminho: string, http: HttpClient) {
        this.urlSalvar = this.restMap.comum.url + caminho + this.restMap.comum.salvar;
        this.urlListar = this.restMap.comum.url + caminho + this.restMap.comum.listar;
        this.urlExcluir = this.restMap.comum.url + caminho + this.restMap.comum.excluir;
        this.urlBuscar = this.restMap.comum.url + caminho + this.restMap.comum.buscar;
        this.urlDetalhar = this.restMap.comum.url + caminho + this.restMap.comum.detalhar;
        this.urlEditar = this.restMap.comum.url + caminho + this.restMap.comum.editar;
        this.http = http;
        this.url = this.restMap.comum.url + caminho;
    }

    salvar(entity: Entity): Observable<any> {
        return this.http.post(this.urlSalvar, entity);
    }

    editar(entity: Entity): Observable<Entity> {
        return this.http.post<Entity>(this.urlEditar, entity);
    }

    listar(): Observable<any> {
        return this.http.get(this.urlListar);
    }

    excluir(id: number): Observable<any> {
        return this.http.delete(`${this.urlExcluir}/${id}`, { responseType: 'text' });
    }

    buscar(filter: Filter): Observable<any> {
        return this.http.post(this.urlBuscar, filter);
    }

    detalhar(id: number): Observable<any> {
        return this.http.get(`${this.urlDetalhar}/${id}`);
    }
}