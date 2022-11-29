import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversaModule } from './conversa/conversa.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(x => HomeModule),
  },
  {
    path: 'conversa',
    loadChildren: () => import('./conversa/conversa.module').then(x => ConversaModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
