import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { LoginObject } from './login-object.model'
import { User } from '../_models/index';
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import {Session} from "../../modulos_login/_models/session.model";

@Injectable()
export class AuthenticationService {

    private localStorageService;
    private currentSession : Session = null;

    constructor(private http: Http,private router: Router) { 
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData()
    }


  setCurrentSession(session: Session): void {
      console.log('setCurrentSession');
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session{
      console.log('loadSessionData');
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
      console.log('getCurrentSession');
    return this.currentSession;
  }

  removeCurrentSession(): void {
      console.log('removeCurrentSession');
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
      console.log('getCurrentUser');
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
      console.log('isAuthenticated');
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
      console.log('getCurrentToken');
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
      console.log('logout');
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}