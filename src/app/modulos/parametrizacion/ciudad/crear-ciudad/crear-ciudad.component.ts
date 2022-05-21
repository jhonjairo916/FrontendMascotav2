import { CompileQueryMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/Ciudad.modelo';
import { DepartamentoModelo } from 'src/app/modelos/Departamento.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ciudad',
  templateUrl: './crear-ciudad.component.html',
  styleUrls: ['./crear-ciudad.component.css']
})
export class CrearCiudadComponent implements OnInit {
  fgValidador = new FormGroup({});
  ciudadModelo: CiudadModelo = new CiudadModelo()
  dptoListado:DepartamentoModelo[]=[];
  constructor(
    private fb: FormBuilder,
    private servicioCiudad: CiudadService,
    private route: Router,
    private servicioDepartamento: DepartamentoService
    ) {
      this.servicioDepartamento.LitarDepartamentos().subscribe(
        (datos)=>{
          this.dptoListado= datos;
        },
        (error)=>{
          alert("Error listing the departamentos ")
        })
     }

  ngOnInit(): void {
    this.CargarFormulario()
  }
  CargarFormulario(){
    this.fgValidador = this.fb.group({
      'nombre':['',Validators.required],
      'departamentoId':['',Validators.required]
    })
  }
  get ObtenerFGV(){
    return this.fgValidador.controls;
  }
  GuardarCiudad(){
    this.ciudadModelo.nombre = this.ObtenerFGV['nombre'].value; 
    this.ciudadModelo.departamentoId = parseInt(this.ObtenerFGV['departamentoId'].value); 
    this.servicioCiudad.GuardarCiudad(this.ciudadModelo).subscribe(
      (datos)=>{
        Swal.fire(
          `Registration of ${datos.nombre} recorded succesfully`,
          'Vover a cargar el listado?',
          'success'
        )
        this.route.navigate(['/parametros/listar-ciudad']);
      },
      (error:any)=>{
        Swal.fire(
          'there was an error registering the departamento '+error.message,
          'Try it again?',
          'question'
        )
      }
    )
  }

}
