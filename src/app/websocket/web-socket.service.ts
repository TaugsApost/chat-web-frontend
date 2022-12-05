import { NgIfContext } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Grupo, Mensagem, MensagemChat, MensagemExcluir, MensagemGrupo } from "../lista-conversas/model/chat-web-model.model";
import * as packageInfo from '../utils/links/estrutura-links.json';

@Injectable({
  providedIn: "root"
})
export class WebSocketService {

  webSocket: WebSocket;
  //webSocketEditar: WebSocket;
  mensagemRecebida: BehaviorSubject<MensagemChat | null> = new BehaviorSubject<MensagemChat | null>(null);
  mensagemGrupoRecebida: BehaviorSubject<MensagemGrupo | null> = new BehaviorSubject<MensagemGrupo | null>(null);
  adicionadoEmUmGrupo: BehaviorSubject<Grupo | null> = new BehaviorSubject<Grupo | null>(null);
  mensagemChatExcluida: BehaviorSubject<MensagemExcluir | null> = new BehaviorSubject<MensagemExcluir | null>(null);
  mensagemEditada: BehaviorSubject<Mensagem | null> = new BehaviorSubject<Mensagem | null>(null);

  private restMap = packageInfo;
  static edicaoMenssagem: boolean = false;

  constructor() {
    this.webSocket = new WebSocket(this.restMap.comum.urlWebSocket);
    // this.webSocketEditar = new WebSocket(this.restMap.comum.urlWebSocket);
  }

  public openWebSocket() {
    this.webSocket.onopen = (event) => {
      console.log('Websocket aberto', event);
    };

    // this.webSocketEditar.onopen = (event) => {
    //   console.log('Websocket editar aberto', event);
    // };

    this.webSocket.onmessage = (event) => {
      this.mensagemRecebida.next(JSON.parse(event.data));
      this.mensagemGrupoRecebida.next(JSON.parse(event.data));
      this.adicionadoEmUmGrupo.next(JSON.parse(event.data));
      this.mensagemChatExcluida.next(JSON.parse(event.data));
      this.mensagemEditada.next(JSON.parse(event.data));
      //}
    };

    // this.webSocketEditar.onmessage = (event) => {
    //   console.log('chamou editar');
    //   this.mensagemEditada.next(JSON.parse(event.data));
    // }

    this.webSocket.onclose = (event) => {
      console.log('Websocket fechado', event);
    }

    // this.webSocketEditar.onclose = (event) => {
    //   console.log('Websocket fechado', event);
    // }
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

  public enviarMensagemEditada(mensagem: Mensagem) {
    // WebSocketService.edicaoMenssagem = true;
    this.webSocket.send(JSON.stringify(mensagem));
  }

  public closeWebSocket() {
    this.webSocket.close();
    //this.webSocketEditar.close();
  }
}