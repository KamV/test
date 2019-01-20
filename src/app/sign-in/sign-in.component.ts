import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { TitleService } from '../../common/services/title.service';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  errorAuth: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: TitleService,) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
		if (user) {
			this.router.navigate(['search']);
		}

    this.setAppTitle();
    this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        rememberMe: false
    });
  }

  get email(): any { return this.form.get('email'); }

  get password(): any { return this.form.get('password'); }

  signIn() {
    if (this.form.valid) {
      this.errorAuth = false;
      this.authService.signIn({user: this.form.value}).subscribe(resp => {
        if (this.form.value.rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify({email: resp.email, name: resp.name, token: resp.token }));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify({email: resp.email, name: resp.name, token: resp.token }));
        }
        this.router.navigate(['search']);
      },
      error => {
        this.errorAuth = true;
      });
    }
  }

  getEmailErrorMessage() {
    return this.form.get('email').hasError('required') ? 'Обязательное поле для заполнения' :
        this.form.get('email').hasError('email') ? 'Email не валиден' : '';
  }

  getPasswordErrorMessage() {
    return this.form.get('password').hasError('required') ? 'Обязательное поле для заполнения' :
        this.form.get('password').hasError('minlength') ? 'Пароль должен содержать не менее 8 знаков ' :
            '';
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Авторизация');
  }

}
