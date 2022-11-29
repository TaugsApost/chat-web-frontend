import { Component, OnInit } from '@angular/core';
import { Mensagem, UsuarioConversa } from './model/chat-web-model.model';

@Component({
  selector: 'app-lista-conversas',
  templateUrl: './lista-conversas.component.html',
  styleUrls: ['./lista-conversas.component.scss']
})
export class ListaConversasComponent implements OnInit {

  listaConversas: UsuarioConversa[] = [];

  constructor() { }

  ngOnInit(): void {
    this.listaConversas.push(
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      },
      {
        idConversa: 0,
        idUsuario: 0,
        nomeConversa: 'Teste',
        listaDeMensagens: [
          {
            idConversa: 0,
            idUsuario: 0,
            idMensagem: 0,
            mensagem: {
              id: 0,
              idUsuario: 0,
              idConversa: 0,
              conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
              dataEnvio: new Date
            }
          }
        ]
      }
    )
  }

}
