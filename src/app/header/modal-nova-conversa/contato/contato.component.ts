import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contato } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { ContatoService } from '../../service/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {

  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() contato: Contato = new Contato;
  @Input() display: boolean = false;

  formulario: FormGroup;

  constructor(private storageService: StorageService, private service: ContatoService,
    private mensagemService: MensagensService, private webSocketService: WebSocketService) {
    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required),
      usernameContato: new FormControl({ value: '', disabled: true })
    });
  }

  inicializarContato() {
    this.formulario.patchValue(this.contato);
  }

  ngOnInit(): void {
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }



  editarContato() {
    if (this.formulario.valid) {
      let formCopy = this.formulario.getRawValue();
      let contato: Contato = {
        nomeContato: formCopy.nome,
        usernameContato: formCopy.usernameContato,
        usernameUsuario: this.storageService.getUsername()
      }
      this.service.editar(contato).subscribe((contato: Contato) => {
        this.salvarNaSession(contato);
        this.mensagemService.mensagemConfimarComRetorno('Sucesso', 'Contato alterado com sucesso').then(value => {
          if (value) {
            this.fecharModal();
          }
        });
      })
    }
  }

  salvarNaSession(contato: Contato) {
    let user = this.storageService.getUser();
    user.listaDeContatos = user.listaDeContatos.filter(c => c.usernameContato != contato.usernameContato);
    user.listaDeContatos.push(contato);
    this.storageService.saveUser(user);
    this.webSocketService.sendContato(contato);
  }

}
