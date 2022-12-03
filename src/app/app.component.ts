import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './login/service/storege.service';
import { LoaderService } from './utils/loader/loader.service';
import { WebSocketService } from './websocket/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chat-frontend';
  loadService: LoaderService;

  constructor(private _loadService: LoaderService,
    private router: Router,
    private webSocketService: WebSocketService,
    private storageService: StorageService) {
    this.loadService = _loadService;
  }
  ngOnInit(): void {
    this.router.navigate(['/home']);
    this.webSocketService.openWebSocket();
    this.monitorarMensagemWebsocket();
  }

  private monitorarMensagemWebsocket(): void {
    this.monitorarNovasMenssagens();
    this.monitorarNovasMensagensGrupo();
    this.monitorarNovosGrupos();
  }

  private monitorarNovasMensagensGrupo() {
    this.webSocketService.mensagemGrupoRecebida.subscribe(mensagem => {
      if (mensagem) {
        if (this.storageService.getListaGrupo().find(g => g.id == mensagem.idGrupo)) {
          let lista = this.storageService.getMensagensGrupo();
          lista.push(mensagem);
          this.storageService.saveMensagensGrupo(lista);
        }
      }
    });
  }

  private monitorarNovasMenssagens() {
    this.webSocketService.mensagemRecebida.subscribe((mensagem) => {
      if (mensagem) {
        let tempMensagem = mensagem;
        if (tempMensagem.usernameReceptor == this.storageService.getUsername()) {
          let user = this.storageService.getUser();
          if (user.listaMensagensRecebidas.find(m => m == mensagem) == null) {
            user.listaMensagensRecebidas = user.listaMensagensRecebidas.concat(tempMensagem);
            this.storageService.saveUser(user);
          }
        }
      }
    });
  }

  private monitorarNovosGrupos() {
    this.webSocketService.adicionadoEmUmGrupo.subscribe(grupo => {
      if (grupo) {
        if (grupo.listaParticipantes.find(p => p.username == this.storageService.getUsername()) != null) {
          this.storageService.addGrupo(grupo);
        }
      }
    });
  }

}
