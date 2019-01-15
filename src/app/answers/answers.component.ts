import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  constructor(
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Ответы');
  }

}
