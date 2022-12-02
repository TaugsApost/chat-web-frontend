import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../login/service/storege.service';
import { WebSocketService } from '../websocket/web-socket.service';
import { MensagemChat } from './model/chat-web-model.model';
import { MensagemService } from './service/mensagem.service';

@Component({
  selector: 'app-lista-conversas',
  templateUrl: './lista-conversas.component.html',
  styleUrls: ['./lista-conversas.component.scss']
})
export class ListaConversasComponent implements OnInit {

  listaConversas: MensagemChat[] = [];
  form: FormGroup

  constructor(private mensagemService: MensagemService, private storageService: StorageService, private webSocketService: WebSocketService) {
    this.form = new FormGroup({
      filtro: new FormControl('')
    });
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    this.carregarConversas();
  }

  criarListaConversa() {
    let lista = this.storageService.getUser().listaMensagensEnviadas.concat(this.storageService.getUser().listaMensagensRecebidas);
    this.listaConversas.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private carregarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername(), '').subscribe(listaConversas => {
      if (listaConversas.length > 0) {
        this.listaConversas = [];
        listaConversas.forEach(conversa => {
          this.listaConversas.push(
            {
              id: conversa.id,
              dataEnvio: conversa.dataEnvio,
              conteudo: conversa.conteudo,
              usernameEmissor: conversa.usernameEmissor,
              usernameReceptor: conversa.usernameReceptor
            }
          )
        });
        this.ordernarMensagem();
      }
      //this.criarListaConversa();
    })
  }

  pesquisarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername(), this.form.controls['filtro'].value).subscribe(listaConversas => {
      this.listaConversas = [];
      if (listaConversas.length > 0) {
        listaConversas.forEach(conversa => {
          this.listaConversas.push(
            {
              id: conversa.id,
              dataEnvio: conversa.dataEnvio,
              conteudo: conversa.conteudo,
              usernameEmissor: conversa.usernameEmissor,
              usernameReceptor: conversa.usernameReceptor
            }
          )
        });
      }
    })
  }

  recebeuMensagem(mensagem: MensagemChat) {
    this.listaConversas = this.listaConversas.filter(c => mensagem.usernameEmissor != c.usernameEmissor && mensagem.usernameEmissor != c.usernameReceptor);
    this.listaConversas.push(mensagem);
    this.ordernarMensagem();
  }

  enviouMensagem(mensagem: MensagemChat) {
    this.listaConversas = this.listaConversas.filter(c => mensagem.usernameReceptor != c.usernameReceptor && mensagem.usernameReceptor != c.usernameEmissor);
    this.listaConversas.push(mensagem);
    this.ordernarMensagem();
  }

  private ordernarMensagem() {
    this.listaConversas.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private monitorarMensagemWebsocket(): void {
    this.webSocketService.mensagemRecebida.subscribe((mensagem) => {
      if (mensagem) {
        if (mensagem.usernameReceptor == this.storageService.getUsername()) {
          this.recebeuMensagem(mensagem);
        }
        if (mensagem.usernameEmissor == this.storageService.getUsername()) {
          this.enviouMensagem(mensagem);
        }
      }
    });
  }
}
