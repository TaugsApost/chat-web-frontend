import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GrupoService } from '../header/service/grupo.service';
import { StorageService } from '../login/service/storege.service';
import { WebSocketService } from '../websocket/web-socket.service';
import { Grupo, MensagemChat, MensagemGrupo } from './model/chat-web-model.model';
import { MensagemService } from './service/mensagem.service';

@Component({
  selector: 'app-lista-conversas',
  templateUrl: './lista-conversas.component.html',
  styleUrls: ['./lista-conversas.component.scss']
})
export class ListaConversasComponent implements OnInit {

  listaConversas: MensagemChat[] = [];
  listaGrupo: Grupo[] = [];
  form: FormGroup
  conversa: boolean = true;

  constructor(private mensagemService: MensagemService, private storageService: StorageService, private webSocketService: WebSocketService,
    private grupoService: GrupoService) {
    this.form = new FormGroup({
      filtro: new FormControl('')
    });
    this.monitorarMensagemWebsocket();
  }

  ngOnInit(): void {
    this.carregarConversas();
    this.carregarGrupos();
    this.carregarTodasMensagensGrupo();
  }

  criarListaConversa() {
    let lista = this.storageService.getUser().listaMensagensEnviadas.concat(this.storageService.getUser().listaMensagensRecebidas);
    this.listaConversas.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private carregarTodasMensagensGrupo() {
    this.mensagemService.buscarTodasMensagensGrupoUsuario().subscribe(mensagens => {
      this.storageService.saveMensagensGrupo(mensagens);
    })
  }

  private carregarGrupos() {
    this.grupoService.buscarPorUsuario().subscribe(grupos => {
      grupos.forEach(grupo => {
        this.listaGrupo.push(grupo);
      });
      this.storageService.saveListaGrupo(grupos);
    });
  }

  private carregarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername(), '').subscribe(listaConversas => {
      if (listaConversas.length > 0) {
        this.listaConversas = [];
        listaConversas.forEach(conversa => {
          this.listaConversas.push(
            {
              id: conversa.id,
              dataEnvio: conversa.dataEnvio,
              conteudo: conversa.conteudo,
              usernameEmissor: conversa.usernameEmissor,
              usernameReceptor: conversa.usernameReceptor
            }
          )
        });
        this.ordernarMensagem();
      }
      //this.criarListaConversa();
    })
  }

  pesquisarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername(), this.form.controls['filtro'].value).subscribe(listaConversas => {
      this.listaConversas = [];
      if (listaConversas.length > 0) {
        listaConversas.forEach(conversa => {
          this.listaConversas.push(
            {
              id: conversa.id,
              dataEnvio: conversa.dataEnvio,
              conteudo: conversa.conteudo,
              usernameEmissor: conversa.usernameEmissor,
              usernameReceptor: conversa.usernameReceptor
            }
          )
        });
      }
    })
  }

  recebeuMensagem(mensagem: MensagemChat) {
    this.listaConversas = this.listaConversas.filter(c => mensagem.usernameEmissor != c.usernameEmissor && mensagem.usernameEmissor != c.usernameReceptor);
    this.listaConversas.push(mensagem);
    this.ordernarMensagem();
  }

  enviouMensagem(mensagem: MensagemChat) {
    this.listaConversas = this.listaConversas.filter(c => mensagem.usernameReceptor != c.usernameReceptor && mensagem.usernameReceptor != c.usernameEmissor);
    this.listaConversas.push(mensagem);
    this.ordernarMensagem();
  }

  recebeuMensagemGrupo(mensagem: MensagemGrupo) {
    this.listaGrupo = this.listaGrupo.filter(g => g.id != mensagem.idGrupo);
    let grupo = this.storageService.getListaGrupo().find(g => g.id == mensagem.idGrupo);
    if (grupo != null) {
      this.listaGrupo.unshift(grupo);
    }
  }

  private ordernarMensagem() {
    this.listaConversas.sort((a, b) => (
      a.dataEnvio > b.dataEnvio ? -1 : 1
    ));
  }

  private monitorarMensagemWebsocket(): void {
    this.webSocketService.mensagemRecebida.subscribe((mensagem) => {
      if (mensagem) {
        if (mensagem.usernameReceptor == this.storageService.getUsername()) {
          this.recebeuMensagem(mensagem);
        }
        if (mensagem.usernameEmissor == this.storageService.getUsername()) {
          this.enviouMensagem(mensagem);
        }
      }
    });
    this.webSocketService.mensagemGrupoRecebida.subscribe(mensagem => {
      if (mensagem) {
        if (this.storageService.getListaGrupo().find(g => g.id == mensagem.idGrupo)) {
          this.recebeuMensagemGrupo(mensagem);
        }
      }
    });
    this.monitorarNovosGrupos();
  }

  private monitorarNovosGrupos() {
    this.webSocketService.adicionadoEmUmGrupo.subscribe(grupo => {
      if (grupo) {
        if (grupo.listaParticipantes != null) {
          if (grupo.listaParticipantes.find(p => p.username == this.storageService.getUsername()) != null) {
            this.listaGrupo.push(grupo);
          }
        }
      }
    });
  }
}
