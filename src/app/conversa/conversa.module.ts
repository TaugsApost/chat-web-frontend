import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { ConversaRoutingModule } from './conversa-routing.module';
import { ConversaComponent } from './componente/conversa.component';
import { ConversaService } from './service/conversa.service';
import { ItemMensagemComponent } from './item-mensagem/item-mensagem.component';
import { GrupoComponent } from './grupo/grupo.component';
import { HeaderModule } from '../header/header.module';
import { ParticipanteComponent } from './grupo/participante/participante.component';
import { TabelaModule } from '../utils/tabela/tabela.module';



@NgModule({
  declarations: [
    ConversaComponent,
    ItemMensagemComponent,
    GrupoComponent,
    ParticipanteComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    ConversaRoutingModule,
    HeaderModule,
    TabelaModule
  ],
  exports: [
    ItemMensagemComponent
  ],
  providers: [
    ConversaService
  ]
})
export class ConversaModule { }
