import { BuscarDialogoComponent } from './buscar-dialogo/buscar-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { Consulta } from './../../_model/consulta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FiltroConsultaDTO } from './../../_dto/filtroConsultaDTO';
import { ConsultaService } from './../../_service/consulta.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  maxFecha: Date = new Date();
  displayedColumns = ['paciente','medico','especialidad','fecha','acciones'];
  @ViewChild(MatSort, { static: true}) sort : MatSort;
  @ViewChild(MatPaginator, { static: true}) paginator : MatPaginator;
  dataSource: MatTableDataSource<Consulta>;

  constructor(
    private consultaService: ConsultaService,
    private dialogo: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'dni': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta': new FormControl()
    });
  }

  verDetalle(consulta: Consulta){
    this.dialogo.open(BuscarDialogoComponent, {
      data: consulta
    });
  }

  buscar(){
    let filtro = new FiltroConsultaDTO(this.form.value['dni'], this.form.value['nombreCompleto'], this.form.value['fechaConsulta']);
    if(filtro.fechaConsulta){
      delete filtro.dni;
      delete filtro.nombreCompleto;

      this.consultaService.buscar(filtro).subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
    }
    else{
      delete filtro.fechaConsulta;
      if(filtro.dni.length === 0){
        delete filtro.nombreCompleto;
      }
      if(filtro.nombreCompleto.length === 0){
        delete filtro.dni;
      }  

      this.consultaService.buscar(filtro).subscribe(data =>{
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
      });
    }
  }

}
