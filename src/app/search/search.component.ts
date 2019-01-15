import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private titleService: TitleService,) { }

  ngOnInit() {
    this.setAppTitle();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Поиск');
  }

}
