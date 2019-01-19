import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../../app/global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { SearchResult } from '../../app/declarations';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  getSearchResult(intitle: string, order: string, page: number): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${GlobalVariable.BASE_API_URL}search?site=stackoverflow&page=${page + 1}&order=${order}&sort=activity&intitle=${intitle}&filter=default`);
  }
}
