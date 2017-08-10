import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CensoTributarioService } from '../../../modulos_censo/services/censo_tributario.service';
import { CensoTributarioModel } from '../../../modulos_censo/models/censo_tributario';
import { GLOBAL } from '../../../modulos_censo/services/global';

import { User } from '../../../modulos_login/_models/index';
import { UserService } from '../../../modulos_login/_services/index';
import { AuthenticationService } from "../../../modulos_login/_services/authentication.service";
import { MdSnackBar } from "@angular/material";

@Component({
	selector: 'censo_tributario',
	templateUrl: './censo_tributario.html',
	styleUrls: ['./censo_tributario.css'],
	providers: [CensoTributarioService]
})

export class CensoTributarioComponent{
	public currentUser: User;
	public titulo: string;
	public datos_: CensoTributarioModel;
	public user: User;
	public fechaActual: Date;

	constructor(
		public snackBar: MdSnackBar,
		private _service: CensoTributarioService,
		private _route: ActivatedRoute,
		private _router: Router,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private router: Router
	){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.titulo = 'Crear un nuevo dato';
    this.fechaActual = new Date();
	this.datos_ = new CensoTributarioModel(null,'',null,null,null,
										'','','','',null,null,'','','',null,null,'',
										'','','',null,'',null,null,'',null,'','','','','','',null,
										'',null,'','','','',null,'','','','','','','',null,'',
										'',null,'',null,'',null,
										'','','','','','',
										'',
										'',null,'',
										'',null,'','',
										'',null,'','',
										'',null,'',null,'');
  }

	ngOnInit(){
		console.log('censo_tributario.ts cargado...');

		this.user = this.authenticationService.getCurrentUser();

		this.datos_.Usuario_Creacion = this.user.firstName +' '+ this.user.lastName;
		this.datos_.Usuario_Cambio = this.user.firstName +' '+ this.user.lastName;
		this.datos_.Fecha_Creacion = (this.fechaActual)
		this.datos_.Fecha_Cambio = (this.fechaActual)
		
	}

	

  public openSnackBar(message: string, action: string) {
	  this.datos_.Estado_Censo = 'Completo';
    console.log(this.datos_)
	this._service.adddatos(this.datos_).subscribe(
		response => {
			if(response.code == 200){
				this.SnackOn(message, action)
				this.datos_ = new CensoTributarioModel(new Date,'',0,0,0,
										'','','','',0,0,'','','',0,0,'',
										'','','',0,'',0,0,'',0,'','','','','','',0,
										'',new Date,'','','','',0,'','','','','','','',0,'',
										'',0,'',0,'',0,
										'','','','','','',
										'',
										'',new Date,'',
										'',0,'','',
										'',0,'','',
										'',new Date,'',new Date,'');
				
			}else{
				console.log(response);
				console.log('Op')
				this.SnackClose(message, action)
				
			}
		},
		error => {
			console.log(<any>error);
			this.SnackClose(message, action)
		}
	);
  }
  public openBorrador(message: string, action: string) {
	  this.datos_.Estado_Censo = 'Borrador';
    console.log(this.datos_)
	this._service.adddatos(this.datos_).subscribe(
		response => {
			if(response.code == 200){
				this.SnackOn(message, action)
				this.datos_ = new CensoTributarioModel(new Date,'',null,null,null,
										'','','','',0,0,'','','',0,0,'',
										'','','',0,'',0,0,'',0,'','','','','','',0,
										'',new Date,'','','','',0,'','','','','','','',0,'',
										'',0,'',0,'',0,
										'','','','','','',
										'',
										'',new Date,'',
										'',0,'','',
										'',0,'','',
										'',new Date,'',new Date,'');
				
			}else{
				console.log(response);
				console.log('Op')
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

	tipoPersonas = [
		'NATURAL',
		'JURIDICA',
	];
	tipoIdentificacions = [
		'NIT',
		'CC',
		'OTRO',
	];
	generos = [
		'MASCULINO',
		'FEMENINO',
	];
	registrados = [
		'SI',
		'NO',
	];
	mayoristas = [
		'SI',
		'NO',
	];
	contribuyentes = [
		'PERMANENTE',
		'OCASIONAL',
	];
	regimens = [
		'COMUN',
		'SIMPLIFICADO',
	];
	libroCons = [
		'SI',
		'NO',
	];
	registradoccs = [
		'SI',
		'NO',
	];
	tipoPredios = [
		'LOCAL',
		'CASA',
		'OFICINA',
	];
	propiedads = [
		'PROPIO',
		'ARRIENDO',
	];
	sectors = [
		'URBANO',
		'RURAL',
	];
	actividadDess = [
		'AGROPECUARIA',
		'COMERCIAL',
		'SERVICIOS',
		'INDUSTRIAL',
		'FINANCIERA',
	];
	avisosYTs = [
		'SI',
		'NO',
	];
	pagoDias = [
		'SI',
		'NO',
	];
	usoSuelos = [
		'SI',
		'NO',
	];
	rutAnxs = [
		'SI',
	];
	ccAnxs = [
		'SI',
	];
	fotocopiaCAnxs = [
		'SI',
	];
	ultimoPAnxs = [
		'SI',
	];
	formularioAnxs = [
		'SI',
	];
	fotocopiaUPIAnxs = [
		'SI',
	];
	primeraVis = [
		'ATENDIDO',
		'CERRADO',
		'SELLADO',
		'RECHAZO',
	];
	SegundaVis = [
		'ATENDIDO',
		'CERRADO',
		'SELLADO',
		'RECHAZO',
	];
}