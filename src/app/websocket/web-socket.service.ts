import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Grupo, Mensagem, MensagemChat, MensagemExcluir, MensagemGrupo } from "../lista-conversas/model/chat-web-model.model";
import * as packageInfo from '../utils/links/estrutura-links.json';

@Injectable({
  providedIn: "root"
})
export class WebSocketService {

  webSocket: WebSocket;
  mensagemRecebida: BehaviorSubject<MensagemChat | null> = new BehaviorSubject<MensagemChat | null>(null);
  mensagemGrupoRecebida: BehaviorSubject<MensagemGrupo | null> = new BehaviorSubject<MensagemGrupo | null>(null);
  adicionadoEmUmGrupo: BehaviorSubject<Grupo | null> = new BehaviorSubject<Grupo | null>(null);
  mensagemChatExcluida: BehaviorSubject<MensagemExcluir | null> = new BehaviorSubject<MensagemExcluir | null>(null);
  private restMap = packageInfo;

  constructor() {
    this.webSocket = new WebSocket(this.restMap.comum.urlWebSocket);
  }

  public openWebSocket() {
    this.webSocket.onopen = (event) => {
      console.log('Websocket aberto', event);
    };

    this.webSocket.onmessage = (event) => {
      this.mensagemRecebida.next(JSON.parse(event.data));
      this.mensagemGrupoRecebida.next(JSON.parse(event.data));
      this.adicionadoEmUmGrupo.next(JSON.parse(event.data));
      this.mensagemChatExcluida.next(JSON.parse(event.data));
    };

    this.webSocket.onclose = (event) => {
      console.log('Websocket fechado', event);
    }
  }

  public sendMessage(message: MensagemChat) {
    this.webSocket.send(JSON.stringify(message));
  }

  public excluiuMensagemChat(message: MensagemExcluir) {
    this.webSocket.send(JSON.stringify(message));
  }

  public sendMessageGrupo(message: MensagemGrupo) {
    this.webSocket.send(JSON.stringify(message));
  }

  public sendNovoGrupo(grupo: Grupo) {
    this.webSocket.send(JSON.stringify(grupo));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}