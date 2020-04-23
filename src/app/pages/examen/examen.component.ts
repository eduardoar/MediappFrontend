import { switchMap } from 'rxjs/operators';
import { ExamenService } from './../../_service/examen.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from 'src/app/_model/examen';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource : MatTableDataSource<Examen>;
  @ViewChild(MatSort, { static : true}) sort : MatSort;
  @ViewChild(MatPaginator, { static : true}) paginator : MatPaginator;

  constructor(
    private examenService : ExamenService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.examenService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Activo', {
        duration: 2000
      });
    });

    this.examenService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(examen : Examen){
    this.examenService.eliminar(examen.idExamen).pipe(switchMap( () => {
      return this.examenService.listar();
    })).subscribe(data => {
      this.examenService.examenCambio.next(data);
      this.examenService.mensajeCambio.next('SE ELIMINO');
    });
  }

}
