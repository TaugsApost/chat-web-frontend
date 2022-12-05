import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { ModaAddContatoComponent } from './modal-add-contato/moda-add-contato.component';
import { ModalNovaConversaComponent } from './modal-nova-conversa/modal-nova-conversa.component';
import { ModalNovoGrupoComponent } from './modal-novo-grupo/modal-novo-grupo.component';
import { TabelaModule } from '../utils/tabela/tabela.module';
import { UsuarioService } from './service/usuario.service';
import { ModalNomeComponent } from './modal-nome/modal-nome.component';
import { ContatoComponent } from './modal-nova-conversa/contato/contato.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ModaAddContatoComponent,
    ModalNovaConversaComponent,
    ModalNovoGrupoComponent,
    ModalNomeComponent,
    ContatoComponent,
  ],
  exports: [
    HeaderComponent,
    ModaAddContatoComponent,
    ModalNovaConversaComponent,
    ModalNovoGrupoComponent,
    ModalNomeComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    TabelaModule
  ],
  providers: [
    UsuarioService
  ]
})
export class HeaderModule { }
