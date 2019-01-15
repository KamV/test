import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Регистрация');
  }

}
