import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { TitleService } from '../../common/services/title.service';
import { AnswerService } from '../../common/services/answer.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  isLoadingResults = true;

  isRateLimitReached = false;

  questionId: number;

  questionTitle: string;

  answers: any[] = [];

  constructor(
    private location: Location,
    private titleService: TitleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private answerService: AnswerService,
  ) {
    activateRoute.params
    .subscribe(params => {
      this.questionId = params['questionId'];
      this.questionTitle = params['questionTitle'];
    });
  }

  ngOnInit() {
    this.setAppTitle();
    this.getAnswersData();
  }

  goBack() {
    this.location.back();
  }

  private setAppTitle() {
    this.titleService.setPageTitle('Ответы');
  }

  private getAnswersData() {
    this.answerService.getAnswers(this.questionId).subscribe(data => {
      this.answers = data.items;
      this.isLoadingResults = false;
    },
    error => {
      this.answers = [];
      this.isLoadingResults = false;
      this.isRateLimitReached = true;
    });
  }

}
