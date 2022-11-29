import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from './tabela.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [
    TabelaComponent
  ],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    TabelaComponent
  ]
})
export class TabelaModule { }
