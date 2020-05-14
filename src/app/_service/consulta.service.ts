import { ConsultaResumenDTO } from './../_dto/consultaResumenDTO';
import { Consulta } from './../_model/consulta';
import { FiltroConsultaDTO } from './../_dto/filtroConsultaDTO';
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

  buscar(filtroConsultaDTO: FiltroConsultaDTO){
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsultaDTO);
  }

  listarExamenPorConsulta(idConsulta: number){
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`);
  }

  listarResumen(){
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`);
  }

  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }

  guardarArchivo(data: File){
    let formdata: FormData = new FormData();
    formdata.append('adjunto', data);

    return this.http.post(`${this.url}/guardarArchivo`, formdata);
  }

  leerArchivo(){
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }

}
