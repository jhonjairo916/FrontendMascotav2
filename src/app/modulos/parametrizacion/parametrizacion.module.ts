import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; 


import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { CrearVacunaComponent } from './vacuna/crear-vacuna/crear-vacuna.component';
import { EditarVacunaComponent } from './vacuna/editar-vacuna/editar-vacuna.component';
import { ListarVacunaComponent } from './vacuna/listar-vacuna/listar-vacuna.component';
import { EliminarVacunaComponent } from './vacuna/eliminar-vacuna/eliminar-vacuna.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento/editar-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { EliminarCiudadComponent } from './ciudad/eliminar-ciudad/eliminar-ciudad.component';
import { CrearTipoMascotaComponent } from './tipoMascota/crear-tipo-mascota/crear-tipo-mascota.component';
import { EditarTipoMascotaComponent } from './tipoMascota/editar-tipo-mascota/editar-tipo-mascota.component';
import { ListarTipoMascotaComponent } from './tipoMascota/listar-tipo-mascota/listar-tipo-mascota.component';
import { EliminarTipoMascotaComponent } from './tipoMascota/eliminar-tipo-mascota/eliminar-tipo-mascota.component';
import { CrearRazaComponent } from './raza/crear-raza/crear-raza.component';
import { EditarRazaComponent } from './raza/editar-raza/editar-raza.component';
import { ListarRazaComponent } from './raza/listar-raza/listar-raza.component';
import { EliminarRazaComponent } from './raza/eliminar-raza/eliminar-raza.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';


@NgModule({
  declarations: [
    CrearVacunaComponent,
    EditarVacunaComponent,
    ListarVacunaComponent,
    EliminarVacunaComponent,
    CrearDepartamentoComponent,
    EditarDepartamentoComponent,
    ListarDepartamentoComponent,
    EliminarDepartamentoComponent,
    CrearCiudadComponent,
    EditarCiudadComponent,
    EliminarCiudadComponent,
    CrearTipoMascotaComponent,
    EditarTipoMascotaComponent,
    ListarTipoMascotaComponent,
    EliminarTipoMascotaComponent,
    CrearRazaComponent,
    EditarRazaComponent,
    ListarRazaComponent,
    EliminarRazaComponent,
    ListarCiudadComponent
  ],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ParametrizacionModule { }
