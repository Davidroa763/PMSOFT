import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SensibilizacionService } from '../../../modulos_censo/services/sensibilizacion.service';
import { SensibilizacionModel } from '../../../modulos_censo/models/sensibilizacion';
import { GLOBAL } from '../../../modulos_censo/services/global';

import { User } from '../../../modulos_login/_models/index';
import { UserService } from '../../../modulos_login/_services/index';
import { AuthenticationService } from "../../../modulos_login/_services/authentication.service";
import { MdSnackBar } from "@angular/material";

@Component({
    selector: 'sensibilizacion-add',
	templateUrl: './sensibilizacion.html',
	styleUrls: ['./sensibilizacion.css'],
	providers: [SensibilizacionService]
})
export class SensibilizacionComponent{
	public currentUser: User;
	public users: User[] = [];
	public titulo: string;
	public datos_: SensibilizacionModel;
	public user: User;
	public fechaActual: Date;

	constructor(
		public snackBar: MdSnackBar,
		private _service: SensibilizacionService,
		private _route: ActivatedRoute,
		private _router: Router,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private router: Router
	){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.titulo = 'Crear un nuevo dato';
		this.fechaActual = new Date();
		this.datos_ = new SensibilizacionModel('','',new Date,'','','','',0,'','',new Date(0,0,0),'',new Date(0,0,0));
	}

	ngOnInit(){
		console.log('sensibilizacion-add.component.ts cargado...');

		this.user = this.authenticationService.getCurrentUser();

		this.datos_.Usuario_Creacion = this.user.firstName +' '+ this.user.lastName;
		this.datos_.Usuario_Cambio = this.user.firstName +' '+ this.user.lastName;
		this.datos_.Fecha_Creacion = (this.fechaActual)
		this.datos_.Fecha_Cambio = (this.fechaActual)
		
	}

	

  public openSnackBar(message: string, action: string) {
	this._service.adddatos(this.datos_).subscribe(
		response => {
			if(response.code == 200){
				this.SnackOn(message, action)
				this.datos_.Fecha = new Date;
				this.datos_.Nobre_Establecimiento = ' ';
				this.datos_.Nobre_Propietario = ' ';
				this.datos_.Direccion_Establecimiento = ' ';
				this.datos_.Actividad_Economica = ' ';
				this.datos_.Telefono_Propietario = 0;
				this.datos_.Firma = ' ';
				
			}else{
				console.log(response);
				this.SnackClose(message, action)
			}
		},
		error => {
			console.log(<any>error);
			this.SnackClose(message, action)
		}
	);
  }

  	public SnackOn(message: string, action: string): void{
		message = 'DATO GUARDADO';action='CON EXITO';
		this.snackBar.open(message, action, {
		duration: 2000,
		});
	};
	public SnackClose(message: string, action: string): void{
		message = 'DATO GUARDADO';action='SIN EXITO';
		this.snackBar.open(message, action, {
		duration: 2000,
		});
	};
}