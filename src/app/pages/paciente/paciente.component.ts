import { PacienteService } from './../../_service/paciente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/Paciente';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  cantidad: number = 0;
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  @ViewChild(MatPaginator, { static : true}) paginator : MatPaginator;

  constructor(private pacienteService : PacienteService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {

    this.pacienteService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.pacienteService.pacienteCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacienteService.listarPageable(0,10).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
      this.cantidad = data.totalElements;
    });

    /*this.pacienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/
  }

  filtrar(valor : any){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idPaciente : number){
    this.pacienteService.eliminar(idPaciente).subscribe(() =>{
      this.pacienteService.listar().subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE ELIMINO');
      })
    });
  }

  mostrarMas(e: any){
    this.pacienteService.listarPageable(e.pageIndex, e. pageSize).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.cantidad = data.totalElements;
    }); 
  }

}
