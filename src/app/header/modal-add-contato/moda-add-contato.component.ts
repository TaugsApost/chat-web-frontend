import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throttleTime } from 'rxjs';
import { Contato, Usuario, UsuarioResponse } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { BasePesquisarComponent } from 'src/app/utils/classes-bases/pesquisar.component';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { ContatoService } from '../service/contato.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'modal-add-contato',
  templateUrl: './moda-add-contato.component.html',
  styleUrls: ['./moda-add-contato.component.scss']
})
export class ModaAddContatoComponent extends BasePesquisarComponent<Usuario, Usuario> implements OnInit {

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter()

  usuarioResponse: UsuarioResponse = new UsuarioResponse;
  displayNome: boolean = false;

  constructor(service: UsuarioService, activatedRoute: ActivatedRoute, _router: Router,
    msgService: MensagensService, private storageService: StorageService, private contatoService: ContatoService,
    private usuarioService: UsuarioService) {
    super(service, activatedRoute, _router, 'estadio', msgService);
    this.formulario = new FormGroup({
      username: new FormControl(storageService.getUsername()),
      usernameContato: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.columns = [
      { nome: 'Nome', value: 'nome', size: '45%', },
      { nome: 'Username', value: 'userName', size: '10%', align: 'center' },
      { value: 'actions', align: 'center', size: '10%' }
    ];
  }
  selecionarUsuario(usuario: UsuarioResponse) {
    let user = this.storageService.getUser();
    if (user.listaDeContatos.find(c => c.usernameContato === usuario.userName) == null) {
      this.usuarioResponse = usuario;
      this.displayNome = true;
    } else {
      this.msgService.mostrarMensagem('Erro', 'Você ja possui este usuario na lista de contatos');
    }
  }
  adicionarUsuario(nome: string) {
    let contato: Contato;
    contato = {
      nomeContato: nome,
      usernameContato: this.usuarioResponse.userName,
      usernameUsuario: this.storageService.getUsername()
    }
    this.contatoService.salvar(contato).subscribe((contato: Contato) => {
      this.displayNome = false;
      this.display = false;
      this.msgService.mostrarMensagem('Sucesso', contato.nomeContato + ' salvo com sucesso!');
      this.usuarioService.buscarPorUsername().subscribe(usuario => {
        this.storageService.saveUser(usuario);
      })
    })
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

}
