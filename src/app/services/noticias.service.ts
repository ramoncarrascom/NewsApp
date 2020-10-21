import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string): Observable<T> {

    query = apiUrl + query;

    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(): Observable<RespuestaTopHeadlines> {

    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?country=us');

  }

  getTopHeadlinesCategoria(categoria: string): Observable<RespuestaTopHeadlines> {

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);

  }
}
