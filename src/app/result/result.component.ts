import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { TitleService } from '../../common/services/title.service';
import { SearchService } from '../../common/services/search.service';


@Component({
  selector: 'search-result',
  styleUrls: ['result.component.scss'],
  templateUrl: 'result.component.html',
})
export class ResultComponent implements OnInit {

  showFunctionalTable: boolean = false;

  dataSource: any;

  resultsLength = 0;

  isLoadingResults = true;

  isRateLimitReached = false;

  functionalDataSource: any;

  functionalResultsLength = 0;

  isLoadingFunctionalResults = true;

  isFunctionalRateLimitReached = false;

  getFunctionalData: any;

  private searchValue: string;

  private functionalSearchValue: any;

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
    this.getData('desc', 1);
  }

  getData(sort: string, page: number) {
    this.isLoadingResults = true;
    this.searchService.getSearchByTitleResult(this.searchValue, sort, page).subscribe(data => {
      this.onSuccess(false, false, 999, new MatTableDataSource(data.items), 'mainTable');
    },
    error => {
      this.onError(false, true, 'mainTable');
    });
  }

  getAuthorData(ownerId: number, sort: string, page: number) {
    this.initFunctionalSearchValue(ownerId, this.getAuthorData);

    if (sort == null && page == null) {
      sort ='desc';
      page = 1;
    }

    this.initFunctionalTableShowing();

    this.searchService.getSearchByOwnerResult(this.functionalSearchValue, sort, page).subscribe(data => {
      this.onSuccess(false, false, 5, new MatTableDataSource(data.items), 'functionalTable');
    },
    error => {
      this.onError(false, true, 'functionalTable');
    });
  }

  getTagData(tag: string, sort: string, page: number) {
    this.initFunctionalSearchValue(tag, this.getTagData);

    if (sort == null && page == null) {
      sort ='desc';
      page = 1;
    }

    this.initFunctionalTableShowing();

    this.searchService.getSearchByTagResult(this.functionalSearchValue, sort, page).subscribe(data => {
      this.onSuccess(false, false, 5, new MatTableDataSource(data.items), 'functionalTable');
    },
    error => {
      this.onError(false, true, 'functionalTable');
    });
  }

  private initFunctionalTableShowing() {
    this.showFunctionalTable = true;
    this.isLoadingFunctionalResults = true;
  }

  private initFunctionalSearchValue(functionalSearchValue: any, searchFunction: Function) {
    if (functionalSearchValue != null) {
      this.functionalSearchValue = functionalSearchValue;
      this.getFunctionalData = searchFunction;
    }
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Результат поиска');
  }

  private onSuccess(isLoadingResults: boolean, isRateLimitReached: boolean, resultsLength: number, dataSource: any, type: string) {
    if (type === 'mainTable') {
      this.isLoadingResults = isLoadingResults;
      this.isRateLimitReached = isRateLimitReached;
      this.resultsLength = resultsLength;
      this.dataSource = dataSource;
    } else {
      this.isLoadingFunctionalResults = isLoadingResults;
      this.isFunctionalRateLimitReached = isRateLimitReached;
      this.functionalResultsLength = resultsLength;
      this.functionalDataSource = dataSource;
    }
  }

  private onError(isLoadingResults: boolean, isRateLimitReached: boolean, type: string) {
    if (type === 'mainTable') {
      this.isLoadingResults = isLoadingResults;
      this.isRateLimitReached = isRateLimitReached;
    } else {
      this.isLoadingFunctionalResults = isLoadingResults;
      this.isFunctionalRateLimitReached = isRateLimitReached;
    }
  }
}
