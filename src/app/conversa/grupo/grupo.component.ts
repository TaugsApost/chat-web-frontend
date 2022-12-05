import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GrupoService } from 'src/app/header/service/grupo.service';
import { Grupo, MensagemGrupo } from 'src/app/lista-conversas/model/chat-web-model.model';
import { MensagemService } from 'src/app/lista-conversas/service/mensagem.service';
import { StorageService } from 'src/app/login/service/storege.service';
import { WebSocketService } from 'src/app/websocket/web-socket.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  form: FormGroup;

  listaMensagens: MensagemGrupo[] = [];
  _storageService: StorageService;
  displayModalNome: boolean = false;
  displayParticipantes: boolean = false;

  constructor(
    private storageService: StorageService,
    private mensagemService: MensagemService,
    private webSocketService: WebSocketService,
    private grupoService: GrupoService,
  ) {
    this._storageService = storageService;
    this.form = new FormGroup({
      mensagem: new FormControl('')
    });
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    this.inicializarConversas();
  }

  public inicializarConversas() {
    this.listaMensagens = [];
    this.criarListaConversas();
  }

  private criarListaConversas() {
    this.listaMensagens = this.storageService.getMensagensGrupo().filter(m => m.idGrupo == this.storageService.getGrupo().id);
    this.ordernarMensagems();
  }

  enviarMensagem() {
    if ((this.form.controls['mensagem'].value as string).trim() != '') {
      let conteudo = this.form.controls['mensagem'].value;
      let mensagem = new MensagemGrupo();
      mensagem.conteudo = conteudo;
      mensagem.dataEnvio = new Date;
      mensagem.idGrupo = this.storageService.getGrupo().id;
      mensagem.username = this.storageService.getUsername();
      this.form.reset();
      this.inicializarConversas();
      this.salvarMensagem(mensagem);

    }
  }

  private enviarMensagemWebsocket(mensagem: MensagemGrupo): void {
    this.webSocketService.sendMessageGrupo(mensagem);
  }

  private ordernarMensagems() {
    this.listaMensagens.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private monitorarMensagemWebsocket(): void {
    this.webSocketService.mensagemGrupoRecebida.subscribe((mensagem) => {
      if (mensagem) {
        if (mensagem.idGrupo == this.storageService.getGrupo().id) {
          this.inicializarConversas();
        }
      }
    });
    this.monitorarMensagensExcluidas();
    this.webSocketService.nomeGrupoEditado.subscribe(grupo => {
      if (grupo) {
        if (this.storageService.getGrupo().id == grupo.id) {
          this.storageService.saveGrupo(grupo);
          this.ngOnInit();
        }
      }
    });
  }

  private monitorarMensagensExcluidas() {
    this.webSocketService.mensagemChatExcluida.subscribe((mensagem) => {
      if (mensagem) {
        // if (this.listaMensagens.find(m => m.id == mensagem.id)) {
        this.inicializarConversas();
        //  }
      }
    });
  }

  private salvarMensagem(mensagem: MensagemGrupo) {
    this.mensagemService.salvarMensagemGrupo(mensagem).subscribe(msg => {
      this.enviarMensagemWebsocket(msg);
    });
  }

  mudarNomeGrupo(nome: string) {
    let grupo = this.storageService.getGrupo();
    grupo.nome = nome;
    this.grupoService.salvar(grupo).subscribe((novoGrupo: Grupo) => {
      //this.storageService.saveGrupo(novoGrupo);
      this.webSocketService.sendNovoGrupo(novoGrupo);
    })

  }

}
