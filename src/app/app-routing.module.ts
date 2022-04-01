import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InicioComponent } from './publico/inicio/inicio.component';

const routes: Routes = [
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path:'',
    pathMatch:'full',//match with empty
    redirectTo:'/inicio'
  },
  {
    path:'parametros',
    
    loadChildren:() =>import('./modulos/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule)
  },
  {
    path:'seguridad',
    loadChildren:() =>import('./modulos/seguridad/seguridad.module').then(s => s.SeguridadModule)
  },
  {
    path:'error-404',
    component:Error404Component

  },
  {
    //This route must be at the end, and it is used to redirect to the /inicio's route when the user type a url that does not exist
    path:'**',
    redirectTo:'error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
