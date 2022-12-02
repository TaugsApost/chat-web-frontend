import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MensagemChat, MensagemChatClone } from 'src/app/lista-conversas/model/chat-web-model.model';
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

    this._webSocketService.openWebSocket();
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    this.inicializarConversas();
  }

  private inicializarConversas() {
    this.listaMensagens = [];
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

  enviarMensagem() {
    if (this.form.controls['mensagem'].value != '') {
      let user = this.storageService.getUser();
      let username = this.storageService.getUsername();
      let usernameReceptor = this.storageService.getUsernameContato();
      let conteudo = this.form.controls['mensagem'].value;
      let mensagem = new MensagemChat();
      mensagem.conteudo = conteudo;
      mensagem.dataEnvio = new Date;
      mensagem.emissor = true;
      mensagem.usernameEmissor = username;
      mensagem.usernameReceptor = usernameReceptor;
      user.listaMensagensEnviadas.push(mensagem);
      this.storageService.saveUser(user);
      this.form.reset();
      this.inicializarConversas();
      this.salvarMensagem(mensagem);
      this.enviarMensagemWebsocket(mensagem);
    }
  }

  private enviarMensagemWebsocket(mensagem: MensagemChatClone): void {
    this._webSocketService.sendMessage(mensagem);
  }

  private monitorarMensagemWebsocket(): void {
    this._webSocketService.mensagemRecebida.subscribe((mensagem) => {
      if (mensagem) {
        const user = this.storageService.getUser();
        user.listaMensagensRecebidas.push(mensagem);
        this.storageService.saveUser(user);
        this.listaMensagens.push(mensagem);
        this.inicializarConversas();
      }
    });
  }

  private salvarMensagem(mensagem: MensagemChat) {
    let mensagemClone = new MensagemChatClone;
    mensagemClone.conteudo = mensagem.conteudo;
    mensagemClone.dataEnvio = mensagem.dataEnvio;
    mensagemClone.usernameEmissor = mensagem.usernameEmissor;
    mensagemClone.usernameReceptor = mensagem.usernameReceptor;
    this.mensagemService.salvarMensagemChat(mensagemClone).subscribe();
  }

}
