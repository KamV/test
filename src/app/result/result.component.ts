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
import { SearchService } from '../../common/services/search.service';


@Component({
  selector: 'search-result',
  styleUrls: ['result.component.scss'],
  templateUrl: 'result.component.html',
})
export class ResultComponent implements OnInit {

  dataSource = new MatTableDataSource();

  displayedColumns = ['lastActivityDate', 'owner', 'title', 'answerCount', 'tags'];

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private searchValue: string;

  constructor(
    private titleService: TitleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private searchService: SearchService,
  ) {
    activateRoute.params.subscribe(params => this.searchValue = params['searchValue']);
  }

  ngOnInit() {
    this.setAppTitle();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.getSearchResultData();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Результат поиска');
  }

  private getSearchResultData() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.searchService.getSearchResult(this.searchValue, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = 999;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy() {
    this.sort.sortChange.unsubscribe();
  }
}
