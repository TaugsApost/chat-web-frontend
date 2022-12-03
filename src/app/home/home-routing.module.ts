import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PaginaCreditosComponent } from './pagina-creditos/pagina-creditos.component';
import { ConversaModule } from '../conversa/conversa.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PaginaCreditosComponent
      },
      {
        path: 'conversa',
        loadChildren: () => import('../conversa/conversa.module').then(x => x.ConversaModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
