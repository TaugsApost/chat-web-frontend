import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
  ) {
      this.form = formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  clickRegistrar(): void {
    this.route.navigate(['/login/register']);
  }

  reloadPage(): void {
    window.location.reload();
  }
}
