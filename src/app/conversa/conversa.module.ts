import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { ConversaRoutingModule } from './conversa-routing.module';
import { ConversaComponent } from './componente/conversa.component';
import { ConversaService } from './service/conversa.service';



@NgModule({
  declarations: [
    ConversaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    ConversaRoutingModule
  ],
  providers: [
    ConversaService
  ]
})
export class ConversaModule { }
