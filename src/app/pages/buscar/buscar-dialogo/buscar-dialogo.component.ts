import { ConsultaService } from './../../../_service/consulta.service';
import { ConsultaListaExamenDTO } from './../../../_dto/consultaListaExamenDTO';
import { Consulta } from './../../../_model/consulta';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-buscar-dialogo',
  templateUrl: './buscar-dialogo.component.html',
  styleUrls: ['./buscar-dialogo.component.css']
})
export class BuscarDialogoComponent implements OnInit {

  consulta: Consulta;
  examenes: ConsultaListaExamenDTO[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Consulta,
    private consultaService: ConsultaService,
    private dialogRef: MatDialogRef<BuscarDialogoComponent>
  ) { }

  ngOnInit(): void {
   this.consulta = this.data;
   this.listarExamenes();
  }

  listarExamenes(){
    this.consultaService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe(data =>{
      this.examenes = data;
    });
  }

  cancelar(){
    this.dialogRef.close();
  }

}
