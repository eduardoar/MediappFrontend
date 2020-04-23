import { Examen } from './../_model/examen';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/examenes`;

  constructor(
    private http : HttpClient
  ) { }

  listar(){
    return this.http.get<Examen[]>(this.url);
  }

  listarPorId(idExamen : number){
    return this.http.get<Examen>(`${this.url}/${idExamen}`);
  }

  registrar(examen : Examen){
    return this.http.post(this.url, examen);
  }

  modificar(examen : Examen){
    return this.http.put(this.url, examen);
  }

  eliminar(idExamen : number){
    return  this.http.delete(`${this.url}/${idExamen}`);
  }
}
