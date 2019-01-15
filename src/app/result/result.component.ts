import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Результат');
  }

}
