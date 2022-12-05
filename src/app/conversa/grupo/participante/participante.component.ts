import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParticipanteService } from 'src/app/header/service/participante.service';
import { Participante } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from 'src/app/login/service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { Coluna } from 'src/app/utils/tabela/colunas.model';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.scss']
})
export class ParticipanteComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() fechar: EventEmitter<any> = new EventEmitter();

  formulario: FormGroup;
  columns: Coluna[] = [];
  datasource: any[] = []

  constructor(private storageService: StorageService, private service: ParticipanteService, private mensagemService: MensagensService) {
    this.formulario = new FormGroup({

    })
  }

  ngOnInit(): void {

  }

  fecharModal() {
    this.display = false;
    this.fechar.emit();
  }

  inicializar() {
    this.datasource = [];
    this.columns = [
      { nome: 'Nome do Contato', value: 'nome', size: '10%', align: 'center' },
      { value: 'actions', align: 'center', size: '5%' }
    ];
    this.criarLista();
  }

  private criarLista() {
    this.storageService.getUser().listaDeContatos.forEach(contato => {
      if (this.storageService.getGrupo().listaParticipantes.find(p => p.username == contato.usernameContato) == null) {
        this.datasource.push(
          {
            dataInscricao: new Date,
            idGrupo: this.storageService.getGrupo().id,
            listaDeMensagens: [],
            username: contato.usernameContato,
            nome: contato.nomeContato
          }
        );
      }
    });
  }

  adicionarParticipante(contato: any) {
    let participante: Participante = {
      dataInscricao: contato.dataInscricao,
      idGrupo: contato.idGrupo,
      listaDeMensagens: contato.listaDeMensagens,
      username: contato.username
    }
    this.service.salvar(participante).subscribe(response => {
      let grupo = this.storageService.getGrupo();
      grupo.listaParticipantes.push(response);
      this.storageService.saveGrupo(grupo);
      this.mensagemService.mensagemConfimarComRetorno('Sucesso', 'Contato adicionado com sucesso').then(value => {
        this.inicializar();
      });
    });
  }


}
