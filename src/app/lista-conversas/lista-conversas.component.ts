import { Component, OnInit } from '@angular/core';
import { StorageService } from '../login/service/storege.service';
import { MensagemChat } from './model/chat-web-model.model';
import { MensagemService } from './service/mensagem.service';

@Component({
  selector: 'app-lista-conversas',
  templateUrl: './lista-conversas.component.html',
  styleUrls: ['./lista-conversas.component.scss']
})
export class ListaConversasComponent implements OnInit {

  listaConversas: MensagemChat[] = [];

  constructor(private mensagemService: MensagemService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.carregarConversas();
    // this.listaConversas.push(
    //   {
    //     id: 0,
    //     dataEnvio: new Date,
    //     conteudo: 'Mensagem de teste absurdamente grande para resolver qualter tipo de espacamento para o meu prjeto ficar bem bonito e legal',
    //     usernameEmissor: 'Taugs',
    //     usernameReceptor: 'Teste'
    //   }
    // )
  }

  private carregarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername()).subscribe(listaConversas => {
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

}
