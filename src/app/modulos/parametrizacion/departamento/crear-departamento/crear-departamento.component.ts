import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoModelo } from 'src/app/modelos/Departamento.modelo';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {
  fgValidador =  new FormGroup({});
  departamento:DepartamentoModelo = new DepartamentoModelo();
  constructor(
    private fb: FormBuilder,
    private servicioDepartamento: DepartamentoService,
    private router: Router) { }

  ConstruirFormulario(){
    this.fgValidador = this.fb.group({
      'nombre':['',Validators.required]
    });
  }
  ngOnInit(): void {
    this.ConstruirFormulario();
  }
  get ObtenerFGV(){
    return this.fgValidador.controls;
  }
  GuardarDepartamento(){
    let nombre = this.ObtenerFGV['nombre'].value;
    this.departamento.nombre = nombre;
    this.servicioDepartamento.GuardarDepartamento(this.departamento).subscribe((data)=>{
     // alert(`Registration of ${data.nombre} recorded succesfully` );
      Swal.fire(
        `Registration of ${data.nombre} recorded succesfully`,
        'Vover a cargar el listado?',
        'success'
      )
      this.router.navigate(['parametros/listar-departamento'])  
    },
    (error:any)=>{
      //alert("Error saving departamento"+error.message)
      Swal.fire(
        'there was an error registering the departamento',
        'Try it again?',
        'question'
      )
    })
  }
  

}
