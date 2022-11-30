import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaConversasModule } from './lista-conversas/lista-conversas.module';
import { HttpErrorInterceptor } from './utils/interceptador/interceptador';
import { MensagensModule } from './utils/mensagens/mensagens.module';
import { PrimengModule } from './utils/primeng/primeng.module';
import { PaginaCreditosComponent } from './home/pagina-creditos/pagina-creditos.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MensagensModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    ListaConversasModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }