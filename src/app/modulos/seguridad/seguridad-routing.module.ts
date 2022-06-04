import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificadorNosesionGuard } from 'src/app/guardianes/verificador-nosesion.guard';
import { VerificadorSesionGuard } from 'src/app/guardianes/verificador-sesion.guard';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ResetearClaveComponent } from './resetear-clave/resetear-clave.component';

const routes: Routes = [
  {
    path:'iniciar-sesion',
    component:IniciarSesionComponent,
    canActivate:[VerificadorNosesionGuard]
  },
  {
    path:'cerrar-sesion',
    component:CerrarSesionComponent,
    canActivate:[VerificadorSesionGuard]
  },
  {
    path:'cambiar-clave',
    component:CambiarClaveComponent,
    canActivate:[VerificadorSesionGuard]
  },
  {
    path:'resetear-clave',
    component:ResetearClaveComponent,
    canActivate:[VerificadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
