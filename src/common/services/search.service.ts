import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable } from '../../app/global';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ISearchResult } from '../../app/declarations';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  getSearchByTitleResult(intitle: string, order: string, page: number): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(`${GlobalVariable.BASE_API_URL}search?site=stackoverflow&page=${page + 1}&pagesize=5&order=${order}&sort=activity&intitle=${intitle}&filter=default`);
  }

  getSearchByOwnerResult(ownerId: number, order: string, page: number): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(`${GlobalVariable.BASE_API_URL}users/${ownerId}/questions?order=${order}&sort=votes&site=stackoverflow&page=${page + 1}`);
  }

  getSearchByTagResult(tag: string, order: string, page: number): Observable<ISearchResult> {
    return this.http.get<ISearchResult>(`${GlobalVariable.BASE_API_URL}search?site=stackoverflow&page=${page + 1}&pagesize=5&order=${order}&sort=votes&tagged=${tag}&filter=default`);
  }
}
