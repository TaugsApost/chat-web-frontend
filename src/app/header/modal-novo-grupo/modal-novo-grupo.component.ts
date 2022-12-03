import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Grupo, Participante } from 'src/app/lista-conversas/model/chat-web-model.model';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';
import { StorageService } from 'src/app/login/service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';
import { GrupoService } from '../service/grupo.service';
import { ParticipanteService } from '../service/participante.service';

@Component({
  selector: 'modal-novo-grupo',
  templateUrl: './modal-novo-grupo.component.html',
  styleUrls: ['./modal-novo-grupo.component.scss']
})
export class ModalNovoGrupoComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter()

  formulario: FormGroup;
  listaContatos: SelectItem[] = [];

  constructor(private storageService: StorageService, private grupoService: GrupoService, private participanteService: ParticipanteService,
    private msgGrupoService: MensagemService, private msgService: MensagensService, private router: Router,
    private webSocketService: WebSocketService) {
    this.formulario = new FormGroup({
      nome: new FormControl('', Validators.required),
      participantes: new FormControl([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.criarListaContatos();
  }

  private criarListaContatos() {
    let user = this.storageService.getUser();
    user.listaDeContatos.forEach(contato => {
      this.listaContatos.push(
        {
          label: contato.nomeContato,
          value: contato.usernameContato
        }
      );
    });
  }

  criarGrupo() {
    if (this.formulario.valid) {
      let grupo: Grupo = new Grupo;
      grupo.nome = this.formulario.controls['nome'].value
      this.grupoService.salvar(grupo).subscribe(grupo => {
        let participantes: Participante[] = [];
        (this.formulario.controls['participantes'].value as string[]).forEach(username => {
          let participante: Participante = new Participante;
          participante.idGrupo = grupo.id;
          participante.username = username;
          participantes.push(participante);
        });
        let participante: Participante = new Participante;
        participante.idGrupo = grupo.id;
        participante.username = this.storageService.getUsername();
        participantes.push(participante);
        this.participanteService.salvarParticipantes(participantes).subscribe(p => {
          grupo.listaParticipantes = participantes;
          this.carregarNovoGrupo(grupo);
        });
      });
    }
  }

  async carregarNovoGrupo(grupo: Grupo) {
    this.msgService.mensagemConfimarComRetorno('Sucesso', 'Grupo criado com sucesso').then(value => {
      if (value) {
        this.router.navigate(['/home/conversa/grupo']);
        this.storageService.saveGrupo(grupo);
        this.storageService.addGrupo(grupo);
        this.webSocketService.sendNovoGrupo((grupo as Grupo));
        this.fecharModal();
      }
    });
  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

}
