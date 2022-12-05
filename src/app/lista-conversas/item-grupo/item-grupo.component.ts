import { DatePipe } from '@angular/common';
import { Component, Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { Grupo, Mensagem, MensagemGrupo } from '../model/chat-web-model.model';
import { MensagemService } from '../service/mensagem.service';

@Component({
  selector: 'app-item-grupo',
  templateUrl: './item-grupo.component.html',
  styleUrls: ['./item-grupo.component.scss']
})
export class ItemGrupoComponent implements OnInit {

  @Input() grupo: Grupo = new Grupo

  formItemConversa: FormGroup;
  tituloConversa: string = '';
  private datepipe: DatePipe = new DatePipe('en-US');


  constructor(private storageService: StorageService, private msgService: MensagemService, private router: Router,
    private webSocketService: WebSocketService) {
    this.formItemConversa = new FormGroup({
      nomeconversa: new FormControl(''),
      ultimaMensagem: new FormControl(''),
      data: new FormControl('')
    });
    this.monitorarMudancaGrupo();
  }

  ngOnInit(): void {
    const msg = this.buscarUltimaMensagem();
    this.formItemConversa.controls['data'].setValue(this.datepipe.transform(msg.dataEnvio == null ? new Date : msg.dataEnvio, 'dd/MM/YYYY'));
    this.tituloConversa = this.grupo.nome
    this.formItemConversa.controls['ultimaMensagem'].setValue(msg.conteudo);
  }

  private buscarUltimaMensagem(): MensagemGrupo {
    let msg: MensagemGrupo = new MensagemGrupo;
    this.storageService.getMensagensGrupo().filter(m => m.idGrupo == this.grupo.id).forEach(mensagem => {
      if (mensagem.dataEnvio > msg.dataEnvio || msg.dataEnvio == null) {
        msg = mensagem;
      }
    });
    return msg;
  }

  salvarGrupo() {
    this.storageService.saveGrupo(this.grupo);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/conversa/grupo']);
    });
  }

  private monitorarMudancaGrupo() {
    this.webSocketService.nomeGrupoEditado.subscribe(grupo => {
      this.ngOnInit();
    })
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
