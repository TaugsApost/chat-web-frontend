import { DatePipe } from '@angular/common';
import { Mensagem, MensagemChat } from 'src/app/lista-conversas/model/chat-web-model.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/login/service/storege.service';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.scss']
})
export class ItemMensagemComponent implements OnInit {

  @Input() emissor: any = true;
  @Input() mensagem: Mensagem = new Mensagem();
  @Output("excluirMensagem") excluirMensagem: EventEmitter<any> = new EventEmitter();
  private datepipe: DatePipe = new DatePipe('en-US');

  hora: string = '';
  _storageService: StorageService;

  constructor(
    private storageService: StorageService,
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

  excluirMessage() {
    this.excluirMensagem.emit();
  }

}
