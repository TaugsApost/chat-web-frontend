import { DatePipe } from '@angular/common';
import { Mensagem, MensagemChat, MensagemExcluir } from 'src/app/lista-conversas/model/chat-web-model.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.scss']
})
export class ItemMensagemComponent implements OnInit {

  @Input() emissor: any = true;
  @Input() mensagem: Mensagem = new Mensagem();
  private datepipe: DatePipe = new DatePipe('en-US');

  hora: string = '';
  _storageService: StorageService;

  constructor(
    private storageService: StorageService,
    private webSocketService: WebSocketService,
    private mensagemService: MensagemService
  ) {
    this._storageService = storageService;
  }

  ngOnInit(): void {
    this.criarLabelHora();
  }
  private criarLabelHora() {
    let formattedDate = this.datepipe.transform(this.mensagem.dataEnvio, 'HH:mm')
    if (formattedDate) {
      this.hora = formattedDate;
    }
  }

  excluirMensagem() {
    let mensagem: MensagemExcluir = new MensagemExcluir;
    mensagem.id = this.mensagem.id;
    this.excluir(mensagem);
  }

  private excluir(mensagem: MensagemExcluir) {
    this.mensagemService.excluir(mensagem.id).subscribe((msg) => {
      this.webSocketService.excluiuMensagemChat(mensagem);
    })
  }



}
