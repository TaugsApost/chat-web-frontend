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



@NgModule({
  declarations: [
    ConversaComponent,
    ItemMensagemComponent,
    GrupoComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    ConversaRoutingModule,
    HeaderModule
  ],
  exports: [
    ItemMensagemComponent
  ],
  providers: [
    ConversaService
  ]
})
export class ConversaModule { }
