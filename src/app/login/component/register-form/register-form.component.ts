import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) {
      this.form = formBuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  clickVoltarLogin(): void {
    this.route.navigate(['login']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
