import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MensagensService } from '../mensagens/mensagens.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private mensagemService: MensagensService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let erroTitulo = '';
                    let erroTexto = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        erroTexto = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        erroTitulo = "Erro Codigo: " + error.status;
                        erroTexto = "Error: " + error.error.message;
                    }
                    this.mensagemService.mostrarMensagem(erroTitulo, erroTexto);
                    // window.alert(errorMessage);
                    return throwError(() => error);
                })
            )
    }
}