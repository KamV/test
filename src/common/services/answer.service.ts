import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../../app/global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SearchResult } from '../../app/declarations';

@Injectable()
export class AnswerService {

  constructor(private http: HttpClient) {}

  getAnswers(questionId: number, order: string, page: number): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${GlobalVariable.BASE_API_URL}questions/${questionId}/answers?page=${page + 1}&order=${order}&sort=votes&site=stackoverflow&filter=withbody`);
  }
}
