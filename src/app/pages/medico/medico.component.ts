import { switchMap } from 'rxjs/operators';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Medico } from 'src/app/_model/medico';
import { MedicoService } from 'src/app/_service/medico.service';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['idmedico','nombres','apellidos','cmp','acciones'];
  dataSource : MatTableDataSource<Medico>;
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, { static : true}) sort : MatSort;

  constructor(
    private medicoService : MedicoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {

    this.medicoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.medicoService.medicoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.medicoService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  filtrar(valor : any){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirDialogo(medico? : Medico){
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogComponent, {
      width: '250PX',
      data: medico
    });
  }

  eliminar(medico : Medico){
    this.medicoService.eliminar(medico.idMedico).pipe(switchMap( () => {
      return this.medicoService.listar();
    })).subscribe(data =>{
      this.medicoService.medicoCambio.next(data);
      this.medicoService.mensajeCambio.next('SE ELIMINO');
    });
  }

}
