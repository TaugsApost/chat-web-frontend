import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/utils/mensagens/mensagens.service';
import { LogarService } from '../../service/login.service';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private service: LogarService, private msgService: MensagensService
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required],
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (this.form.valid) {
      this.service.salvar(this.form.value).subscribe(response => {
        this.msgService.mensagemConfimarComRetorno('Sucesso', 'Usuário ' + this.form.controls['username'].value + ' criado com sucesso').then(value => {
          if (value) {
            this.clickVoltarLogin();
          }
        });
      });
    } else {
      this.msgService.mostrarMensagem('Erro', 'Preencha todos os dados');
    }
  }

  clickVoltarLogin(): void {
    this.route.navigate(['login']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
