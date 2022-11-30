import { Component, Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { MensagemChat } from '../model/chat-web-model.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-conversa',
  templateUrl: './item-conversa.component.html',
  styleUrls: ['./item-conversa.component.scss']
})
export class ItemConversaComponent implements OnInit {

  @Input() itemConversa: MensagemChat = new MensagemChat;

  formItemConversa: FormGroup;
  tituloConversa: string = '';
  private datepipe: DatePipe = new DatePipe('en-US');

  constructor() {
    this.formItemConversa = new FormGroup({
      nomeconversa: new FormControl(),
      ultimaMensagem: new FormControl(),
      data: new FormControl()
    });
  }

  ngOnInit(): void {
    //console.log(this.itemConversa.nomeConversa);
    this.formItemConversa.controls['nomeconversa'].setValue(this.itemConversa.usernameEmissor);
    this.formItemConversa.controls['ultimaMensagem'].setValue(this.itemConversa.conteudo);
    let formattedDate = this.datepipe.transform(this.itemConversa.dataEnvio, 'dd/MM/YYYY')
    this.formItemConversa.controls['data'].setValue(formattedDate);
    this.gerarTitulo();
    //this.ultimaConversa();
  }

  private gerarTitulo() {
    let username = window.sessionStorage.getItem('username');
    console.log(username);
    if (username == this.itemConversa.usernameEmissor) {
      this.tituloConversa = this.itemConversa.usernameReceptor;
    } else {
      this.tituloConversa = this.itemConversa.usernameEmissor;
    }
  }

  // private ultimaConversa() {
  //   let mensagem: UsuarioConversaMensagem = new UsuarioConversaMensagem;
  //   this.itemConversa.listaDeMensagens.forEach(msg => {
  //     if (msg.idMensagem >= mensagem.idMensagem) {
  //       mensagem = msg;
  //     }
  //   });
  //   this.formItemConversa.controls['ultimaMensagem'].setValue(mensagem.mensagem.conteudo);
  //   let formattedDate = this.datepipe.transform(mensagem.mensagem.dataEnvio, 'dd/MM/YYYY')
  //   this.formItemConversa.controls['data'].setValue(formattedDate);
  // }

  salvarIdConversa() {
    window.localStorage.setItem('idConversa', this.itemConversa.usernameEmissor);
    window.localStorage.setItem('idUsuario', this.itemConversa.usernameReceptor);
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

