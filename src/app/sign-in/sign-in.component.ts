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
  login = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  errorAuth: boolean = false;

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
    });
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Авторизация');
  }

  signIn() {
    // this.authService.signIn(this.form.value.login, this.form.value.password).subscribe(resp => {
    //   this.authService.getMe().subscribe(resp => {
    //     localStorage.setItem('currentUser', JSON.stringify({id: resp.id, isAuth: true, role: resp.roles[0].authority }));
    //     this.router.navigate(['favourites']);
    //   });
    // },
    // error => {
    //       this.errorAuth = true;
    // });
  }

  getLoginErrorMessage() {
    return this.login.hasError('required') ? 'Обязательное поле для заполнения' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Обязательное поле для заполнения' :
        this.password.hasError('minlength') ? 'Пароль должен содержать не менее 8 знаков ' :
            '';
  }

}
