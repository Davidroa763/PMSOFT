import { Component, OnInit } from '@angular/core';

import { User } from '../../modulos_login/_models/index';
import { UserService } from '../../modulos_login/_services/index';

import {AuthenticationService} from "../../modulos_login/_services/authentication.service";
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    public user: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.user = this.authenticationService.getCurrentUser();
        
    }
}