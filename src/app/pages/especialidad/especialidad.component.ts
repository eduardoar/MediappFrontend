import { switchMap } from 'rxjs/operators';
import { EspecialidadService } from './../../_service/especialidad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from 'src/app/_model/especialidad';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  displayedColumns = ['id','nombre','acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatSort, { static : true}) sort : MatSort;
  @ViewChild(MatPaginator, { static : true}) paginator : MatPaginator;
  
  constructor(
    private especialidadService : EspecialidadService,
    public route : ActivatedRoute,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.especialidadService.especialidadCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.especialidadService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data, 'Aviso', {
        duration : 2000
      });
    });

    this.especialidadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idEspecialidad : number){
    this.especialidadService.eliminar(idEspecialidad).pipe(switchMap(()=>{
        return this.especialidadService.listar();
    })).subscribe(data =>{
      this.especialidadService.especialidadCambio.next(data);
      this.especialidadService.mensajeCambio.next('SE ELIMINO');
    });
  }

}
