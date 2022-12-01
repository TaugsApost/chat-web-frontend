import { Component, OnInit } from '@angular/core';
import { MensagemChat } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.scss']
})
export class ConversaComponent implements OnInit {

  listaMensagens: MensagemChat[] = [];
  _storageService: any;

  constructor(private storageService: StorageService) {
    this._storageService = storageService;
  }

  ngOnInit(): void {
    this.criarListaConversas();
    this.definirPosicaoMensagem();
  }

  private criarListaConversas() {
    let user = this.storageService.getUser();
    this.listaMensagens = this.listaMensagens.concat(user.listaMensagensEnviadas.filter(m => m.usernameReceptor == this.storageService.getUsernameContato()))
    this.listaMensagens = this.listaMensagens.concat(user.listaMensagensRecebidas.filter(m => m.usernameEmissor == this.storageService.getUsernameContato()))
    this.listaMensagens.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }
  private definirPosicaoMensagem() {
    this.listaMensagens.forEach(m => {
      if (m.usernameEmissor == this.storageService.getUsername()) {
        m.emissor = true;
      } else {
        m.emissor = false;
      }
    });
  }
  private ordernarMensagens() {
    // this.listaMensagens.
  }

}
