import { ConsultaListaExamenDTO } from './../_dto/consultaListaExamenDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {


  url : string = `${environment.HOST}/consultas`;

  constructor(private http : HttpClient) { }

  registrar(consultaDTO : ConsultaListaExamenDTO){
    return this.http.post(this.url, consultaDTO);
  }
}
