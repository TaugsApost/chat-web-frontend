import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MensagemChat } from 'src/app/lista-conversas/model/chat-web-model.model';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.scss']
})
export class ConversaComponent implements OnInit {

  form: FormGroup;

  listaMensagens: MensagemChat[] = [];
  _storageService: StorageService;
  _webSocketService: WebSocketService;

  constructor(
    private storageService: StorageService,
    private mensagemService: MensagemService,
    private webSocketService: WebSocketService,
  ) {
    this.form = new FormGroup({
      mensagem: new FormControl('')
    });
    this._storageService = storageService;
    this._webSocketService = webSocketService;
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    //this.monitorarMensagemWebsocket();
    console.log('on init')
    this.inicializarConversas();
  }

  public inicializarConversas() {
    this.listaMensagens = [];
    this.criarListaConversas();
  }

  private criarListaConversas() {
    let user = this.storageService.getUser();
    this.listaMensagens = this.listaMensagens.concat(user.listaMensagensEnviadas.filter(m => m.usernameReceptor == this.storageService.getUsernameContato()))
    this.listaMensagens = this.listaMensagens.concat(user.listaMensagensRecebidas.filter(m => m.usernameEmissor == this.storageService.getUsernameContato()))
    this.listaMensagens.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  enviarMensagem() {
    if ((this.form.controls['mensagem'].value as string).trim() != '') {
      let conteudo = this.form.controls['mensagem'].value;
      let mensagem = new MensagemChat();
      mensagem.conteudo = conteudo;
      mensagem.dataEnvio = new Date;
      mensagem.usernameEmissor = this.storageService.getUsername();
      mensagem.usernameReceptor = this.storageService.getUsernameContato();
      this.form.reset();
      this.salvarMensagem(mensagem);
    }
  }

  private enviarMensagemWebsocket(mensagem: MensagemChat): void {
    this._webSocketService.sendMessage(mensagem);
  }

  private monitorarMensagemWebsocket(): void {
    this.monitorarMensagensRecebidas();
    this.monitorarMensagensExcluidas();
  }

  private monitorarMensagensRecebidas() {
    this._webSocketService.mensagemRecebida.subscribe((mensagem) => {
      if (mensagem) {
        if (mensagem.usernameReceptor == this.storageService.getUsername()
          || (mensagem.usernameEmissor == this.storageService.getUsername())) {
          this.inicializarConversas();
        }
      }
    });
  }

  private monitorarMensagensExcluidas() {
    this._webSocketService.mensagemChatExcluida.subscribe((mensagem) => {
      if (mensagem) {
        this.inicializarConversas();
      }
    });
  }

  private salvarMensagem(mensagem: MensagemChat) {
    this.mensagemService.salvarMensagemChat(mensagem).subscribe(novaMsg => {
      this.enviarMensagemWebsocket(novaMsg);
    });
  }

}
