import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato, Conversa } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { BasePesquisarComponent } from 'src/app/utils/classes-bases/pesquisar.component';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'modal-nova-conversa',
  templateUrl: './modal-nova-conversa.component.html',
  styleUrls: ['./modal-nova-conversa.component.scss']
})
export class ModalNovaConversaComponent extends BasePesquisarComponent<Contato, Contato> implements OnInit {

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter()

  constructor(service: ContatoService, activatedRoute: ActivatedRoute, _router: Router,
    msgService: MensagensService, private storageService: StorageService) {
    super(service, activatedRoute, _router, 'estadio', msgService);
    this.formulario = new FormGroup({
      nome: new FormControl(''),
      username: new FormControl(this.storageService.getUsername())
    });
  }

  ngOnInit(): void {
    this.columns = [
      { nome: 'Nome', value: 'nome', size: '45%', },
      { value: 'actions', align: 'center', size: '10%' }
    ];
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

  criarNovaConversa(contato: Contato) {
    let conversa: Conversa = {
      username1: this.storageService.getUsername(),
      username2: contato.usernameContato
    }
    this.storageService.saveConversa(conversa);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home/conversa']);
      this.fecharModal();
    });
  }

}
