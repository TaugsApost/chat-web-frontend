import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaConversasComponent } from './lista-conversas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { ItemConversaComponent, LabelControl } from './item-conversa/item-conversa.component';
import { ItemGrupoComponent } from './item-grupo/item-grupo.component';



@NgModule({
  declarations: [
    ListaConversasComponent,
    ItemConversaComponent,
    LabelControl,
    ItemGrupoComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
  ],
  exports: [
    ListaConversasComponent,

  ]
})
export class ListaConversasModule { }
