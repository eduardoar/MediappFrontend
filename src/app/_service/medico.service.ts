import { Medico } from './../_model/medico';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/medicos`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(idMedico : number){
    return this.http.get<Medico>(`${this.url}/${idMedico}`);
  }

  registrar(medico : Medico){
    return this.http.post(this.url, medico);
  }

  modificar(medico : Medico){
    return this.http.put(this.url, medico);
  }

  eliminar(idMedico : number){
    return this.http.delete(`${this.url}/${idMedico}`);
  }


}
