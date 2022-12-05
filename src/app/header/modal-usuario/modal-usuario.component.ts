import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';
import { LogarService } from 'src/app/login/service/login.service';
import { StorageService } from 'src/app/login/service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { ModalUsuarioService } from './modal-usuario.service';

@Component({
  selector: 'modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {

  @Output() fechar: EventEmitter<any> = new EventEmitter();
  @Input() display: boolean = false;

  formulario: FormGroup

  constructor(private storageService: StorageService, private mensagemService: MensagensService, private usuarioSevice: ModalUsuarioService) {
    this.formulario = new FormGroup({
      username: new FormControl({ value: this.storageService.getUsername(), disabled: true }),
      senha: new FormControl(this.storageService.getUser().senha, Validators.required),
      nome: new FormControl(this.storageService.getUser().nome, Validators.required),
      listaDeContatos: new FormControl(this.storageService.getUser().listaDeContatos),
      listaMensagensEnviadas: new FormControl(this.storageService.getUser().listaMensagensEnviadas),
      listaMensagensRecebidas: new FormControl(this.storageService.getUser().listaMensagensRecebidas),
      listaGrupos: new FormControl(this.storageService.getUser().listaGrupos),
    });
  }

  ngOnInit(): void {
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

  salvarUsuario() {
    if (this.formulario.valid) {
      this.usuarioSevice.editar(this.formulario.getRawValue()).subscribe(usuario => {
        this.storageService.saveUser(usuario);
        this.mensagemService.mensagemConfimarComRetorno('Sucesso', 'Usuario alterado com sucesso!').then(value => {
          if (value) {
            this.fecharModal();
          }
        });
      })
    }
  }


}
