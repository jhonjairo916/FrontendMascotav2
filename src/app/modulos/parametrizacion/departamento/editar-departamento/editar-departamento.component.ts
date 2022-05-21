import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoModelo } from 'src/app/modelos/Departamento.modelo';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.css']
})
export class EditarDepartamentoComponent implements OnInit {
  fgValidador = new FormGroup({});
   departamentoModelo = new DepartamentoModelo();
   id: number=0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,//it allow to acced to url data
    private router: Router,
    private servicioDepartamento: DepartamentoService) { }

  ngOnInit(): void {
    
    this.CrearFormulario()
    this.id = this.route.snapshot.params['id'];
    
    this.servicioDepartamento.BuscarDepartamento(this.id).subscribe(
      (datos)=>{
        this.fgValidador.controls['id'].setValue(datos.id);
        this.fgValidador.controls['nombre'].setValue(datos.nombre);
      },
      (error)=>{
        alert("The searched record was no found "+ error)
      }
    )
  }
  CrearFormulario(){
    this.fgValidador = this.fb.group({
      id:['',Validators.required],
      nombre:['',Validators.required]
    });
  }
  ActualizarDepartamento(){
      let id = this.fgValidador.controls['id'].value;
      let nombre = this.fgValidador.controls['nombre'].value;
      this.departamentoModelo.id = id;
      this.departamentoModelo.nombre = nombre;
      this.servicioDepartamento.ActualizarDepartamento(this.departamentoModelo).subscribe(
        ()=>{
          Swal.fire(
            `The departamento  " ${this.departamentoModelo.nombre} " was updated succesfully`,
            'load the list again',
            'success'
          )
        },
        (error)=>{
          Swal.fire(
            'there was an error editing the departamento',
            'Try it again?',
            'question'
          )
          console.log(error);
        },
        ()=>{
          this.router.navigate(['./parametros/listar-departamento']);
        }
      )
  }


}
