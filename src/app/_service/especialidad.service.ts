import { HttpClient } from '@angular/common/http';
import { Especialidad } from './../_model/especialidad';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  url : string = `${environment.HOST}/especialidades`;

  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Especialidad[]>(this.url);
  }

  listarPorId(idEspecialidad : number){
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`);
  }

  registrar(especialidad : Especialidad){
    return this.http.post(this.url, especialidad);
  }

  modificar(especialidad : Especialidad){
    return this.http.put(this.url, especialidad);
  }

  eliminar(idEspecialidad : number){
    return this.http.delete(`${this.url}/${idEspecialidad}`);
  }

}
