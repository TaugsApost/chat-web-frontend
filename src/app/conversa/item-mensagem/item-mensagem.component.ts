import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MensagemChat } from 'src/app/lista-conversas/model/chat-web-model.model';

@Component({
  selector: 'app-item-mensagem',
  templateUrl: './item-mensagem.component.html',
  styleUrls: ['./item-mensagem.component.scss']
})
export class ItemMensagemComponent implements OnInit {

  @Input() emissor: any = true;
  @Input() mensagem: MensagemChat = new MensagemChat();
  private datepipe: DatePipe = new DatePipe('en-US');

  hora: string = '';

  constructor() { }

  ngOnInit(): void {
    this.criarLabelHora();
  }
  private criarLabelHora() {
    let formattedDate = this.datepipe.transform(this.mensagem.dataEnvio, 'hh:mm')
    if (formattedDate) {
      this.hora = formattedDate;
    }
  }

}
