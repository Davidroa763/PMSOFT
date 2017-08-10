import { Component } from '@angular/core';
import { SensibilizacionService } from '../../modulos_censo/services/sensibilizacion.service';

import { User } from '../../modulos_login/_models/index';
import { UserService } from '../../modulos_login/_services/index';
import { AuthenticationService } from "../../modulos_login/_services/authentication.service";

@Component({
	selector: 'censo',
	templateUrl: './censo.component.html',
	styleUrls: ['./censo.component.css'],
})
export class CensoComponent{
  public currentUser: User;
  public users: User[] = [];
  public titulo: string;
  public user: User;

  constructor(private userService: UserService,
  private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }

  ngOnInit() {
    this.user = this.authenticationService.getCurrentUser();
  }


}