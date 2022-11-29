import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
