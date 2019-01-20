import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { TitleService } from '../../common/services/title.service';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  // name = new FormControl('', [Validators.required]);
  // email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', [Validators.required, Validators.minLength(8)]);

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
        name: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get name(): any { return this.form.get('name'); }

  get email(): any { return this.form.get('email'); }

  get password(): any { return this.form.get('password'); }

  signUp() {
    if (this.form.valid) {
      this.authService.signUp({user: this.form.value}).subscribe(resp => {
        this.router.navigate(['signin']);
      });
    }
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Регистрация');
  }

  getLoginErrorMessage() {
    return this.form.get('name').hasError('required') ? 'Обязательное поле для заполнения' : '';
  }

  getEmailErrorMessage() {
    return this.form.get('email').hasError('required') ? 'Обязательное поле для заполнения' :
        this.form.get('email').hasError('email') ? 'Email не валиден' : '';
  }

  getPasswordErrorMessage() {
    return this.form.get('password').hasError('required') ? 'Обязательное поле для заполнения' :
        this.form.get('password').hasError('minlength') ? 'Пароль должен содержать не менее 8 знаков' : '';
  }

}
