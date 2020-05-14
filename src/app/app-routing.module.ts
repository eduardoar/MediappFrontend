import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not403Component } from './pages/not403/not403.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
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
    ], canActivate: [GuardService]
  },
  { path: 'medico', component: MedicoComponent },
  { path: 'examen', component: ExamenComponent, children: [
    { path: 'nuevo', component: ExamenEdicionComponent },
    { path: 'edicion/:id', component: ExamenEdicionComponent}
  ], canActivate: [GuardService]
  },
  { path: 'especialidad', component: EspecialidadComponent, children: [
    { path: 'nuevo', component: EspecialidadEdicionComponent },
    { path: 'edicion/:id', component: EspecialidadEdicionComponent}
  ], canActivate: [GuardService]
  },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService]},
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService]},
  { path: 'consulta-wizard', component: WizardComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'not-403', component: Not403Component},
  { path: 'not-404', component: Not404Component},
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent, children: [
    { path: ':token', component: TokenComponent }
  ] },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'not-404', pathMatch: 'full'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
