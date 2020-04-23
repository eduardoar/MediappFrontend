import { switchMap } from 'rxjs/operators';
import { Especialidad } from './../../../_model/especialidad';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-especialidad-edicion',
  templateUrl: './especialidad-edicion.component.html',
  styleUrls: ['./especialidad-edicion.component.css']
})
export class EspecialidadEdicionComponent implements OnInit {

  form : FormGroup;
  id : number;
  edicion : boolean;

  constructor(
    private especialidadService : EspecialidadService,
    private route : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl('')
    });

    this.route.params.subscribe((params : Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.initForm();
  }

  initForm(){
    if(this.edicion){
      this.especialidadService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idEspecialidad),
          'nombre' : new FormControl(data.nombre)
        });
      });
    }
  }


  operar(){
    let especialidad = new Especialidad;
    especialidad.idEspecialidad = this.form.value['id'];
    especialidad.nombre = this.form.value['nombre'];

    if(this.edicion){
      this.especialidadService.modificar(especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data =>{
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('SE MODIFICO');
      });
    }
    else{
      this.especialidadService.registrar(especialidad).pipe(switchMap(() => {
        return this.especialidadService.listar();
      })).subscribe(data =>{
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('SE REGISTRO');
      });
    }

    this.router.navigate(['especialidad']);
  }

}
