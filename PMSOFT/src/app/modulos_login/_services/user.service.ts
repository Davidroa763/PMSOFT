import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LoginObject } from './login-object.model'
import { User } from '../_models/index';
import {Observable} from "rxjs";
import {Session} from "../../modulos_login/_models/session.model";
@Injectable()
export class UserService {
  constructor(private http: Http) {}

  private basePath = '/api/authenticate/';

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post(this.basePath + 'login', loginObj).map(this.extractData);
  }

  logout(): Observable<Boolean> {
    return this.http.post(this.basePath + 'logout', {}).map(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}