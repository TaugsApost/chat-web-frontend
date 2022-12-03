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
  canDeleteMsg: boolean = false;

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
    this.canDeleteMsg = false;
    this.monitorarNovasMenssagens();
    this.monitorarNovasMensagensGrupo();
    this.monitorarNovosGrupos();
    this.monitorarMensagensChatExcluidas();
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
        if (mensagem.usernameEmissor == this.storageService.getUsername()) {
          if (this.storageService.getUser().listaMensagensEnviadas.find(m => m.id == mensagem.id) == null) {
            let user = this.storageService.getUser();
            user.listaMensagensEnviadas.push(mensagem)
            this.storageService.saveUser(user);
            this.canDeleteMsg = false;
          } else {
            this.canDeleteMsg = true;
          }
        } else {
          if (mensagem.usernameReceptor == this.storageService.getUsername()) {
            if (this.storageService.getUser().listaMensagensRecebidas.find(m => m.id == mensagem.id) == null) {
              let user = this.storageService.getUser();
              user.listaMensagensRecebidas.push(mensagem)
              this.storageService.saveUser(user);
              this.canDeleteMsg = false;
            } else {
              this.canDeleteMsg = true;
            }
          } else {
            this.canDeleteMsg = true;
          }
        }
      }
    });
  }

  private monitorarMensagensChatExcluidas() {
    this.webSocketService.mensagemChatExcluida.subscribe((mensagem) => {
      if (mensagem && this.canDeleteMsg) {
        if (this.storageService.getUser().listaMensagensEnviadas.find(m => m.id == mensagem.id) != null) {
          let user = this.storageService.getUser();
          user.listaMensagensEnviadas = user.listaMensagensEnviadas.filter(m => m.id != mensagem.id);
          this.storageService.saveUser(user);
          this.canDeleteMsg = false;
        } else {
          if (this.storageService.getUser().listaMensagensRecebidas.find(m => m.id == mensagem.id) != null) {
            let user = this.storageService.getUser();
            user.listaMensagensRecebidas = user.listaMensagensRecebidas.filter(m => m.id != mensagem.id);
            this.storageService.saveUser(user);
            this.canDeleteMsg = false;
          }
        }
      }
    });
  }

  private monitorarNovosGrupos() {
    this.webSocketService.adicionadoEmUmGrupo.subscribe(grupo => {
      if (grupo) {
        if (grupo.listaParticipantes != null) {
          if (grupo.listaParticipantes.find(p => p.username == this.storageService.getUsername()) != null) {
            this.storageService.addGrupo(grupo);
          }
        }
      }
    });
  }

}
