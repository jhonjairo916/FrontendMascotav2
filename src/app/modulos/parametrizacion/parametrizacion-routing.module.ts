import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';

const routes: Routes = [
  {
    path:'crear-departamento',
    component:CrearDepartamentoComponent
  },
  {
    path:'listar-departamento',
    component:ListarDepartamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
