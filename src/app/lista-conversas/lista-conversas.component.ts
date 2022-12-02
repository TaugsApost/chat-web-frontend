import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  form: FormGroup

  constructor(private mensagemService: MensagemService, private storageService: StorageService) {
    this.form = new FormGroup({
      filtro: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.carregarConversas();
  }

  private carregarConversas() {
    this.mensagemService.listarConversas(this.storageService.getUsername(), '').subscribe(listaConversas => {
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
        this.listaConversas.sort((a, b) => (
          a.dataEnvio > b.dataEnvio ? -1 : 1
        ));
      }
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

}
