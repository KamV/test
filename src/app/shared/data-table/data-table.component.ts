import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'data-table',
  styleUrls: ['data-table.component.scss'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent implements OnInit {

  @Input() dataSource: any;

  @Input() resultsLength: number;

  @Input() isLoadingResults: boolean;

  @Input() isRateLimitReached: boolean;

  @Output() onChangeTable:  EventEmitter<any> = new EventEmitter();

  @Output() onGetOwnerTable:  EventEmitter<any> = new EventEmitter();

  @Output() onGetTagTable:  EventEmitter<any> = new EventEmitter();

  displayedColumns = ['lastActivityDate', 'owner', 'title', 'answerCount', 'tags'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private searchValue: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    this.changeTableEvent();
  }

  private changeTableEvent() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.onChangeTable.emit([this.sort.direction, this.paginator.pageIndex]);
    });

    this.paginator.page.subscribe(() => this.onChangeTable.emit([this.sort.direction, this.paginator.pageIndex]));
  }

  showOwnerFunctionalPanel(ownerId: number) {
    this.onGetOwnerTable.emit([ownerId]);
  }

  showAnswers(questionId: number, questionTitle: string) {
    this.router.navigate(['answers', questionId,questionTitle]);
  }

  showTagFunctionalPanel(tag: string) {
    this.onGetTagTable.emit([tag]);
  }

  ngOnDestroy() {
    this.sort.sortChange.unsubscribe();
    this.paginator.page.unsubscribe();
  }
}
