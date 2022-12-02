import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MensagemChat } from "../lista-conversas/model/chat-web-model.model";
import * as packageInfo from '../utils/links/estrutura-links.json';

@Injectable({
  providedIn: "root"
})
export class WebSocketService {

  webSocket: WebSocket;
  mensagemRecebida: BehaviorSubject<MensagemChat | null> = new BehaviorSubject<MensagemChat | null>(null);
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
    };

    this.webSocket.onclose = (event) => {
      console.log('Websocket fechado', event);
    }
  }

  public sendMessage(message: MensagemChat) {
    this.webSocket.send(JSON.stringify(message));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}