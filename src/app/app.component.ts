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
    console.log('testeasda')
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

}
