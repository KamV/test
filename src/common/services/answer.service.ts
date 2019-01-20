import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../../app/global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { IAnswers } from '../../app/declarations';

@Injectable()
export class AnswerService {

  constructor(private http: HttpClient) {}

  getAnswers(questionId: number): Observable<IAnswers> {
    return this.http.get<IAnswers>(`${GlobalVariable.BASE_API_URL}questions/${questionId}/answers?order=desc&sort=votes&site=stackoverflow&filter=withbody`);
  }
}
