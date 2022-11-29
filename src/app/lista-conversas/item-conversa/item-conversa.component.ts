import { Component, Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { UsuarioConversa, UsuarioConversaMensagem } from '../model/chat-web-model.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-conversa',
  templateUrl: './item-conversa.component.html',
  styleUrls: ['./item-conversa.component.scss']
})
export class ItemConversaComponent implements OnInit {

  @Input() itemConversa: UsuarioConversa = new UsuarioConversa;

  formItemConversa: FormGroup;
  private datepipe: DatePipe = new DatePipe('en-US');

  constructor() {
    this.formItemConversa = new FormGroup({
      nomeconversa: new FormControl(),
      ultimaMensagem: new FormControl(),
      data: new FormControl()
    });
  }

  ngOnInit(): void {
    console.log(this.itemConversa.nomeConversa);
    this.formItemConversa.controls['nomeconversa'].setValue(this.itemConversa.nomeConversa);
    this.ultimaConversa();
  }

  private ultimaConversa() {
    let mensagem: UsuarioConversaMensagem = new UsuarioConversaMensagem;
    this.itemConversa.listaDeMensagens.forEach(msg => {
      if (msg.idMensagem >= mensagem.idMensagem) {
        mensagem = msg;
      }
    });
    this.formItemConversa.controls['ultimaMensagem'].setValue(mensagem.mensagem.conteudo);
    let formattedDate = this.datepipe.transform(mensagem.mensagem.dataEnvio, 'dd/MM/YYYY')
    this.formItemConversa.controls['data'].setValue(formattedDate);
  }

  salvarIdConversa() {
    window.localStorage.setItem('idConversa', this.itemConversa.idConversa.toString());
    window.localStorage.setItem('idUsuario', this.itemConversa.idUsuario.toString());
  }
}
@Directive({
  selector: 'label[controlName]',
})
export class LabelControl {
  @Input() controlName: string = '';

  constructor(@Optional() private parent: ControlContainer) { }

  @HostBinding('textContent')
  get controlValue() {
    return this.parent == null ? '' : (this.parent.control as any).get(this.controlName).value;
  }
}

