import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'medico', component: MedicoComponent },
  { path: 'examen', component: ExamenComponent, children: [
    { path: 'nuevo', component: ExamenEdicionComponent },
    { path: 'edicion/:id', component: ExamenEdicionComponent}
  ]
  },
  { path: 'especialidad', component: EspecialidadComponent, children: [
    { path: 'nuevo', component: EspecialidadEdicionComponent },
    { path: 'edicion/:id', component: EspecialidadEdicionComponent}
  ]
  },
  { path: 'consulta', component: ConsultaComponent},
  { path : 'consulta-especial', component: EspecialComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
