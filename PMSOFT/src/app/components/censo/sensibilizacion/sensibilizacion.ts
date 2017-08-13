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
		this.datos_ = new SensibilizacionModel(null,null,(this.fechaActual),null,null,null,null,null,null,null,null,null,null);
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
				this.datos_.Fecha = (this.fechaActual);
				this.datos_.Nobre_Establecimiento = ' ';
				this.datos_.Nobre_Propietario = ' ';
				this.datos_.Direccion_Establecimiento = ' ';
				this.datos_.Actividad_Economica = ' ';
				this.datos_.Telefono_Propietario = 0;
				this.datos_.Firma = null;
				
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

	firmas = [
		{value: 'SI', viewValue: 'SI'},
		{value: 'NO', viewValue: 'NO'}
	  ];
	municipios = [
		{value: 'Anolaima', viewValue: 'Anolaima'},
		{value: 'Arbelaez', viewValue: 'Arbeláez'},
		{value: 'Caparrapi', viewValue: 'Caparrapí'},
		{value: 'Choachi', viewValue: 'Choachí'},
		{value: 'Cucunuba', viewValue: 'Cucunubá'},
		{value: 'Fomeque', viewValue: 'Fomeque'},
		{value: 'Gachala', viewValue: 'Gachalá'},
		{value: 'Gachancipa', viewValue: 'Gachancipá'},
		{value: 'Guataqui', viewValue: 'Guataquí'},
		{value: 'Jerusalen', viewValue: 'Jerusalén'},
		{value: 'La Calera', viewValue: 'La Calera'},
		{value: 'La Vega', viewValue: 'La Vega'},
		{value: 'Medina', viewValue: 'Medina'},
		{value: 'Nariño', viewValue: 'Nariño'},
		{value: 'Pacho', viewValue: 'Pacho'},
		{value: 'Paratebueno', viewValue: 'Paratebueno'},
		{value: 'Pasca', viewValue: 'Pasca'},
		{value: 'San Bernardo', viewValue: 'San Bernardo'},
		{value: 'San Cayetano', viewValue: 'San Cayetano'},
		{value: 'San Juan de Rioseco', viewValue: 'San Juan de Rioseco'},
		{value: 'Sibate', viewValue: 'Sibaté'},
		{value: 'Sopo', viewValue: 'Sopó'},
		{value: 'Suesca', viewValue: 'Suesca'},
		{value: 'Supata', viewValue: 'Supatá'},
		{value: 'Sutatausa', viewValue: 'Sutatausa'},
		{value: 'Tibacuy', viewValue: 'Tibacuy'},
		{value: 'Tocaima', viewValue: 'Tocaima'},
		{value: 'Topaipi', viewValue: 'Topaipí'},
		{value: 'Zipaquira', viewValue: 'Zipaquirá'}
	  ];

	operadors = [
		{value: 'Christian Andres Gonzalez Vanegas', viewValue: 'Christian Andrés González Vanegas'},
		{value: 'Estefania Hernandez Pinzon', viewValue: 'Estefanía Hernández Pinzón'},
		{value: 'Giselle Fonseca Vergel', viewValue: 'Giselle Fonseca Vergel'},
		{value: 'Jorge Albeiro Torres Gomez', viewValue: 'Jorge Albeiro Torres Gómez'},
		{value: 'Juan Carlos Pachon Sierra', viewValue: 'Juan Carlos Pachón Sierra'},
		{value: 'Judy Andrea Pinzon Vega', viewValue: 'Judy Andrea Pinzón Vega'},
		{value: 'Luisa Fernanda Colorado Osorio', viewValue: 'Luisa Fernanda Colorado Osorio'},
		{value: 'Maria Amparo Montaño Fuentes', viewValue: 'María Amparo Montaño Fuentes'},
		{value: 'Maria Eugenia Agudelo Galeano', viewValue: 'María Eugenia Agudelo Galeano'},
		{value: 'Marisol Dias Peña', viewValue: 'Marisol Días Peña'},
		{value: 'Martha Isabel Suarez Ballen', viewValue: 'Martha Isabel Suarez Ballén'},
		{value: 'Milton Raul Ramirez Salinas', viewValue: 'Milton Raúl Ramírez Salinas'},
		{value: 'Nelson Enrique Sabogal Velez', viewValue: 'Nelson Enrique Sabogal Vélez'},
		{value: 'Nohora Idali Ramos Fernandez', viewValue: 'Nohora Idali Ramos Fernández'},
		{value: 'Nydia Yaneth Angarita Rios', viewValue: 'Nydia Yaneth Angarita Ríos'}
	  ];
}