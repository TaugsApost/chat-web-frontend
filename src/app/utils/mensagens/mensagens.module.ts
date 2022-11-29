import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagensComponent } from './mensagens.component';
import { PrimengModule } from 'src/app/utils/primeng/primeng.module';
import { MensagensService } from './mensagens.service';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [
    MensagensComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    MensagensComponent
  ],
  providers: [
    ConfirmationService,
    MensagensService
  ]
})
export class MensagensModule { }
