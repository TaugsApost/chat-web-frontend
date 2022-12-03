import { DatePipe } from '@angular/common';
import { Component, Directive, HostBinding, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/login/service/storege.service';
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


  constructor(private storageService: StorageService, private msgService: MensagemService, private router: Router) {
    this.formItemConversa = new FormGroup({
      nomeconversa: new FormControl(''),
      ultimaMensagem: new FormControl(''),
      data: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.formItemConversa.controls['data'].setValue(this.datepipe.transform(this.grupo.dataAlteracao, 'dd/MM/YYYY'));
    this.tituloConversa = this.grupo.nome
    this.formItemConversa.controls['ultimaMensagem'].setValue(this.ultimaMensagem());
  }

  private ultimaMensagem(): string {
    let msgGrupo: MensagemGrupo = new MensagemGrupo;
    this.grupo.listaParticipantes.forEach(participante => {
      participante.listaDeMensagens.forEach(msg => {
        if (msg.dataEnvio > msgGrupo.dataEnvio || msgGrupo.dataEnvio == null) {
          msgGrupo = msg
        }
      })
    })
    return msgGrupo.conteudo;
  }

  salvarGrupo() {
    if (this.storageService.getGrupo().id != this.grupo.id) {
      this.msgService.listarMensagensGrupo(this.grupo.id).subscribe(msg => {
        this.storageService.saveGrupo(this.grupo, msg);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/home/conversa/grupo']);
        });
      })
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home/conversa/grupo']);
      });
    }
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
