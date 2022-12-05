import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contato, Conversa } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { BasePesquisarComponent } from 'src/app/utils/classes-bases/pesquisar.component';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'modal-nova-conversa',
  templateUrl: './modal-nova-conversa.component.html',
  styleUrls: ['./modal-nova-conversa.component.scss']
})
export class ModalNovaConversaComponent extends BasePesquisarComponent<Contato, Contato> implements OnInit {

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter()
  displayEdit: boolean = false;
  contato: Contato = new Contato

  constructor(service: ContatoService, activatedRoute: ActivatedRoute, _router: Router,
    msgService: MensagensService, private storageService: StorageService, private contatoService: ContatoService,
    private webSocketService: WebSocketService) {
    super(service, activatedRoute, _router, 'estadio', msgService);
    this.formulario = new FormGroup({
      nome: new FormControl(''),
      username: new FormControl(this.storageService.getUsername())
    });
  }

  ngOnInit(): void {
    this.columns = [
      { nome: 'Nome', value: 'nome', size: '45%', },
      { value: 'actions', align: 'center', size: '20%' }
    ];
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

  contatoEditado() {
    this.displayEdit = false;
    this.pesquisar();
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

  editarContato(contato: Contato) {
    this.contato = contato;
    this.displayEdit = true;
  }

  excluirContato(contatoResponse: any) {
    let contato: Contato = {
      nomeContato: contatoResponse.nome,
      usernameContato: contatoResponse.usernameContato,
      usernameUsuario: this.storageService.getUsername()
    }
    this.msgService.mostrarMensagemSimNao('Excluir', 'Ao confirmar você apagara o seu contato referente ao usuario ' + contato.usernameContato + '. Deseja prosseguir com a operação?').then(value => {
      if (value) {
        this.contatoService.deletarContato(contato).subscribe(response => {
          this.removerDaSession(contato);
          this.msgService.mensagemConfimarComRetorno('Sucesso', 'Contato excluido com sucesso').then(value => {
            if (value) {
              this.pesquisar();
            }
          });
        });
      }
    });
  }

  removerDaSession(contato: Contato) {
    let user = this.storageService.getUser();
    user.listaDeContatos = user.listaDeContatos.filter(c => c.usernameContato != contato.usernameContato);
    this.storageService.saveUser(user);
    this.webSocketService.sendContato(contato);
  }

}
