import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LogarService } from '../../service/login.service';
import { Usuario } from 'src/app/lista-conversas/model/chat-web-model.model';
import { StorageService } from '../../service/storege.service';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: LogarService,
    private storegeService: StorageService,
    private msgService: MensagensService
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.logar(this.form.value).subscribe((response: Usuario) => {
        this.storegeService.saveUser(response);
        this.route.navigate(['/home']);
      },
        erro => {
          this.msgService.mostrarMensagem('Falha de Autentificação', 'Não foi possível efetuar o Login. Usuario ou senha incorretos')
        }
      );
    }
    console.log(this.form.value);
  }

  clickRegistrar(): void {
    this.route.navigate(['/login/register']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
