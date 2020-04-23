import { switchMap } from 'rxjs/operators';
import { Examen } from './../../../_model/examen';
import { ExamenService } from './../../../_service/examen.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-examen-edicion',
  templateUrl: './examen-edicion.component.html',
  styleUrls: ['./examen-edicion.component.css']
})
export class ExamenEdicionComponent implements OnInit {

  form : FormGroup;
  id : number;
  edicion : boolean;

  constructor(
    private examenService : ExamenService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id' : new FormControl(''),
      'nombre' : new FormControl(''),
      'descripcion' : new FormControl(''),
    });

    this.route.params.subscribe((params : Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if(this.edicion){
      this.examenService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id' : new FormControl(data.idExamen),
          'nombre' : new FormControl(data.nombre),
          'descripcion' : new FormControl(data.descripcion),
        });
      });
    }
  }

  operar(){
    let examen = new Examen();
    examen.idExamen = this.form.value['id'];
    examen.nombre = this.form.value['nombre'];
    examen.descripcion = this.form.value['descripcion'];

    if(this.edicion){

      this.examenService.modificar(examen).pipe(switchMap( () =>{
        return this.examenService.listar();
      })).subscribe( data =>{
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('SE MODIFICO');
      });

    }
    else{
      
      this.examenService.registrar(examen).pipe(switchMap( () =>{
        return this.examenService.listar();
      })).subscribe(data =>{
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('SE REGISTRO');
      });

    }
    
    this.router.navigate(['examen']);
  }

}
