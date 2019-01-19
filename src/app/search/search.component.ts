import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TitleService } from '../../common/services/title.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  form: FormGroup;

  constructor(
    private titleService: TitleService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setAppTitle();
    this.form = this.formBuilder.group({
        searchValue: '',
    });
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Поиск');
  }

  search() {
    if (this.form.value.searchValue.trim()) {
      this.router.navigate(['result', this.form.value.searchValue.trim()]);
    }
  }

}
