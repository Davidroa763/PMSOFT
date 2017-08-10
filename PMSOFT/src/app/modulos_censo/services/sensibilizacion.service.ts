import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SensibilizacionModel } from '../models/sensibilizacion';
import { GLOBAL } from './global';

@Injectable()
export class SensibilizacionService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}
	adddatos(sensibilizacion_data: SensibilizacionModel){
		let json = JSON.stringify(sensibilizacion_data);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'Datos_Sensibilizacion', params, {headers: headers})
						 .map(res => res.json());
	}
}