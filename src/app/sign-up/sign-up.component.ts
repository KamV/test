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

  login = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
    this.form = this.formBuilder.group({
        login: '',
        password: '',
        email: '',
        nickname: '',
        birthDate: ''
    });
  }

  signup() {
    console.log('hello');
    // this.authService.signUp(this.form.value).subscribe(resp => {
    //   localStorage.setItem('currentUser', JSON.stringify({id: resp.id, nickname: resp.nickname, isAuth: true, role: resp.roles[0].authority }));
    //   this.router.navigate(['favourites']);
    // });
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Регистрация');
  }

  getLoginErrorMessage() {
    return this.login.hasError('required') ? 'Обязательное поле для заполнения' : '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Обязательное поле для заполнения' :
        this.email.hasError('email') ? 'Email не валиден' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Обязательное поле для заполнения' :
        this.password.hasError('minlength') ? 'Пароль должен содержать не менее 8 знаков' : '';
  }

}
