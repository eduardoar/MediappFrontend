import { PacienteService } from './../../../_service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/_model/paciente';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private pacienteService : PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id' : new FormControl(''),
      'nombres' : new FormControl(''),
      'apellidos' : new FormControl(''),
      'dni' : new FormControl(''),
      'telefono' : new FormControl(''),
      'direccion' : new FormControl('')
    });

    this.route.params.subscribe((params : Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      this.pacienteService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idPaciente),
          'nombres' : new FormControl(data.nombres),
          'apellidos' : new FormControl(data.apellidos),
          'dni' : new FormControl(data.dni),
          'telefono' : new FormControl(data.telefono),
          'direccion' : new FormControl(data.direccion)
        });
      });
    }
  }
  operar(){
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.telefono = this.form.value['telefono'];
    paciente.direccion = this.form.value['direccion'];

    if(this.edicion){
      this.pacienteService.modificar(paciente).subscribe(() =>{
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }
    else{
      this.pacienteService.registrar(paciente).subscribe(() =>{
        this.pacienteService.listar().subscribe(data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    
    this.router.navigate(['paciente']);
  }

}
