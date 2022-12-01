import { Component, Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Conversa, MensagemChat } from '../model/chat-web-model.model';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/login/service/storege.service';
import { Router } from '@angular/router';

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

  constructor(private storageService: StorageService, private router: Router) {
    this.formItemConversa = new FormGroup({
      nomeconversa: new FormControl(),
      ultimaMensagem: new FormControl(),
      data: new FormControl()
    });
  }

  ngOnInit(): void {
    this.formItemConversa.controls['nomeconversa'].setValue(this.itemConversa.usernameEmissor);
    this.formItemConversa.controls['ultimaMensagem'].setValue(this.itemConversa.conteudo);
    let formattedDate = this.datepipe.transform(this.itemConversa.dataEnvio, 'dd/MM/YYYY')
    this.formItemConversa.controls['data'].setValue(formattedDate);
    this.gerarTitulo();
  }

  private gerarTitulo() {
    let username = window.sessionStorage.getItem('username');
    console.log(username);
    if (username == this.itemConversa.usernameEmissor) {
      this.tituloConversa = this.buscarNomeContato(this.itemConversa.usernameReceptor);
    } else {
      this.tituloConversa = this.buscarNomeContato(this.itemConversa.usernameEmissor);
    }
  }

  private buscarNomeContato(username: string): string {
    let contato = this.storageService.getUser().listaDeContatos.find(c => c.usernameContato == username);
    if (contato != null) {
      return contato.nomeContato;
    } else {
      return username;
    }
  }

  salvarConversa() {
    let conversa: Conversa = {
      username1: this.storageService.getUsername(),
      username2: this.storageService.getUsername() == this.itemConversa.usernameEmissor ?
        this.itemConversa.usernameReceptor : this.itemConversa.usernameEmissor
    }
    this.storageService.saveConversa(conversa);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/conversa']);
    });
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

