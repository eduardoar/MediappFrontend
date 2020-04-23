import { ConsultaListaExamenDTO } from './../../_dto/consultaListaExamenDTO';
import { Consulta } from './../../_model/consulta';
import { ConsultaService } from './../../_service/consulta.service';
import { ExamenService } from './../../_service/examen.service';
import { EspecialidadService } from './../../_service/especialidad.service';
import { MedicoService } from './../../_service/medico.service';
import { PacienteService } from './../../_service/paciente.service';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { Examen } from './../../_model/examen';
import { Especialidad } from './../../_model/especialidad';
import { Medico } from './../../_model/medico';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes : Paciente[];
  medicos : Medico[];
  especialidades : Especialidad[];
  examenes : Examen[];

  maxFecha : Date = new Date();
  fechaSeleccionada: Date = new Date();

  diagnostico: string;
  tratamiento: string;
  mensaje: string;

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];

  idPacienteSeleccionado : number;
  idMedicoSeleccionado : number;
  idEspecialidadSeleccionado : number;
  idExamenSeleccionado : number;

  constructor(
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.listarPacientes();
    this.listarEspecialidad();
    this.listarMedicos();
    this.listarExamenes();

  }

  aceptar(){

    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;

    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;

    let consulta = new Consulta();
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.especialidad = especialidad;
    consulta.numConsultorio = "1";
    
    //ISODATE
    let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    //console.log(localISOTime);//yyyy-mm-ddTHH:mm:ss
    consulta.fecha = localISOTime;
    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamenDTO = new ConsultaListaExamenDTO();
    consultaListaExamenDTO.consulta = consulta;
    consultaListaExamenDTO.lstExamen = this.examenesSeleccionados;
    
    this.consultaService.registrar(consultaListaExamenDTO).subscribe(() =>{
      this.snackBar.open('SE REGISTRO', 'Aviso', { duration: 2000})

      setTimeout(() => {
        this.limpiarControles();
      }, 2000);

    });

  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }

  estadoBotonRegistrar(){
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }

  removerExamen(idExamen : number){
    this.examenesSeleccionados.splice(idExamen, 1);
  }

  agregarExamen(){
    if(this.idExamenSeleccionado > 0){

      let cont = 0;
      for(let i = 0; i < this.examenesSeleccionados.length; i++){
        let examen = this.examenesSeleccionados[i];
        if(examen.idExamen === this.idExamenSeleccionado){
          cont++;
          break;
        }
      }

      if(cont>0){
        this.mensaje = 'El examen se encuentra en la lista';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000});
      }
      else{
        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;

        this.examenService.listarPorId(this.idExamenSeleccionado).subscribe(data =>{
          examen.nombre = data.nombre;
          examen.descripcion = data.descripcion;
          this.examenesSeleccionados.push(examen);
        });
      }
    }
  }

  agregar(){
    if(this.diagnostico != null && this.tratamiento != null){
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      this.diagnostico = null;
      this.tratamiento = null;
    }
  }

  removerDiagnostico(index : number){
    this.detalleConsulta.splice(index, 1);
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecialidad(){
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }

  listarMedicos(){
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

  listarExamenes(){
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }

}
