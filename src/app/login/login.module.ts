import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login-form/login.component';
import { PrimengModule } from '../utils/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { StorageService } from './service/storege.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StorageService
  ]
})
export class LoginModule { }
