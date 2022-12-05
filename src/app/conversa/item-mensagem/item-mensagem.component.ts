import { DatePipe } from '@angular/common';
import { Mensagem, MensagemChat, MensagemExcluir, MensagemGrupo } from 'src/app/lista-conversas/model/chat-web-model.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.scss']
})
export class ItemMensagemComponent implements OnInit {

  @Input() emissor: any = true;
  @Input() mensagem: Mensagem = new Mensagem();

  editMsg: boolean = false;

  private datepipe: DatePipe = new DatePipe('en-US');

  hora: string = '';
  _storageService: StorageService;
  form: FormGroup

  constructor(
    private storageService: StorageService,
    private webSocketService: WebSocketService,
    private mensagemService: MensagemService
  ) {
    this.form = new FormGroup({
      mensagem: new FormControl('')
    });
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
    mensagem.conteudo = this.mensagem.conteudo;
    mensagem.idGrupo = (this.mensagem as MensagemGrupo).idGrupo;
    this.excluir(mensagem);
  }

  habilitarEdicaoMensagem() {
    this.editMsg = true;
    this.form.controls['mensagem'].setValue(this.mensagem.conteudo);
  }

  private excluir(mensagem: MensagemExcluir) {
    this.mensagemService.excluir(mensagem.id).subscribe((msg) => {
      this.webSocketService.excluiuMensagemChat(mensagem);
    })
  }

  editarMensagem() {
    if ((this.form.controls['mensagem'].value as string).trim() != '') {
      this.editMsg = false;
      this.mensagem.conteudo = this.form.controls['mensagem'].value;
      if ((this.mensagem as MensagemChat).usernameEmissor != null) {
        this.mensagemService.salvarMensagemChat((this.mensagem as MensagemChat)).subscribe((mensagem) => {
          let msg = (mensagem as Mensagem);
          this.webSocketService.enviarMensagemEditada(msg);
        });
      } else {
        this.mensagemService.salvarMensagemGrupo((this.mensagem as MensagemGrupo)).subscribe((mensagem) => {
          this.webSocketService.sendMessageGrupo(mensagem);
        });
      }
    }
  }



}
