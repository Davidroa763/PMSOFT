import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CensoTributarioModel } from '../models/censo_tributario';
import { GLOBAL } from './global';

@Injectable()
export class CensoTributarioService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}
	adddatos(censo_tributario_data: CensoTributarioModel){
		let json = JSON.stringify(censo_tributario_data);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'Datos_Censo_Tributario', params, {headers: headers})
						 .map(res => res.json());
	}
}