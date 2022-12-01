import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { HomeRoutingModule } from './home-routing.module';
import { ListaConversasModule } from '../lista-conversas/lista-conversas.module';
import { PaginaCreditosComponent } from './pagina-creditos/pagina-creditos.component';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    HomeComponent,
    PaginaCreditosComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ListaConversasModule,
    HeaderModule
  ]
})
export class HomeModule { }
