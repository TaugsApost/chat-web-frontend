import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MensagemGrupo } from 'src/app/lista-conversas/model/chat-web-model.model';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  form: FormGroup;

  listaMensagens: MensagemGrupo[] = [];
  _storageService: StorageService;

  constructor(
    private storageService: StorageService,
    private mensagemService: MensagemService,
    private webSocketService: WebSocketService
  ) {
    this._storageService = storageService;
    this.form = new FormGroup({
      mensagem: new FormControl('')
    });
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    this.inicializarConversas();
  }

  public inicializarConversas() {
    this.listaMensagens = [];
    this.criarListaConversas();
  }

  private criarListaConversas() {
    this.listaMensagens = this.storageService.getMensagensGrupo().filter(m => m.idGrupo == this.storageService.getGrupo().id);
    this.ordernarMensagems();
  }

  enviarMensagem() {
    if ((this.form.controls['mensagem'].value as string).trim() != '') {
      let conteudo = this.form.controls['mensagem'].value;
      let mensagem = new MensagemGrupo();
      mensagem.conteudo = conteudo;
      mensagem.dataEnvio = new Date;
      mensagem.idGrupo = this.storageService.getGrupo().id;
      mensagem.username = this.storageService.getUsername();
      this.form.reset();
      this.inicializarConversas();
      this.salvarMensagem(mensagem);

    }
  }

  private enviarMensagemWebsocket(mensagem: MensagemGrupo): void {
    this.webSocketService.sendMessageGrupo(mensagem);
  }

  private ordernarMensagems() {
    this.listaMensagens.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private monitorarMensagemWebsocket(): void {
    this.webSocketService.mensagemGrupoRecebida.subscribe((mensagem) => {
      if (mensagem) {
        if (mensagem.idGrupo == this.storageService.getGrupo().id) {
          this.inicializarConversas();
        }
      }
    });
    this.monitorarMensagensExcluidas();
  }

  private monitorarMensagensExcluidas() {
    this.webSocketService.mensagemChatExcluida.subscribe((mensagem) => {
      if (mensagem) {
        // if (this.listaMensagens.find(m => m.id == mensagem.id)) {
        this.inicializarConversas();
        //  }
      }
    });
  }

  private salvarMensagem(mensagem: MensagemGrupo) {
    this.mensagemService.salvarMensagemGrupo(mensagem).subscribe(msg => {
      this.enviarMensagemWebsocket(msg);
    });
  }

}
