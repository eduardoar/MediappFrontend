import { Medico } from 'src/app/_model/medico';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from 'src/app/_service/medico.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.css']
})
export class MedicoDialogComponent implements OnInit {

  medico: Medico;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : Medico,
    private dialogRef : MatDialogRef<MedicoDialogComponent>,
    private medicoService : MedicoService
  ) { }

  ngOnInit(): void {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
    this.medico.fotoUrl = this.data.fotoUrl;
  }

  operar(){
    if(this.medico.idMedico > 0 && this.medico != null){
        this.medicoService.modificar(this.medico).pipe(switchMap( () =>{
          return this.medicoService.listar();
        })).subscribe( data =>{
          this.medicoService.medicoCambio.next(data);
          this.medicoService.mensajeCambio.next('SE MODIFICO'); 
        });
    }
    else{
      this.medicoService.registrar(this.medico).subscribe(data =>{
        this.medicoService.listar().subscribe(data =>{
          this.medicoService.medicoCambio.next(data);
          this.medicoService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.cancelar();

  }

  cancelar(){ 
    this.dialogRef.close();
  }

}
