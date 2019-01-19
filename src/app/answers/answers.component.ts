import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { TitleService } from '../../common/services/title.service';
import { AnswerService } from '../../common/services/answer.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  dataSource = new MatTableDataSource();

  displayedColumns = ['score', 'owner', 'answer'];

  answersLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  test = "<button>hello</button>"

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private questionId: number;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private answerService: AnswerService,
  ) {
    activateRoute.params.subscribe(params => this.questionId = params['questionId']);
  }

  ngOnInit() {
    this.setAppTitle();
    // this.getAnswersData();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Ответы');
  }

  private getAnswersData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.answerService.getAnswers(this.questionId, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.answersLength = 999;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

}
