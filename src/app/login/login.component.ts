import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Авторизация');
  }

}
